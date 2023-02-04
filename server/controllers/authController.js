import catchAsync from '../utils/catchAsync.js';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import crypto from 'crypto';

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 1000,
  });
  return token;
};

const sendToClient = (user, res, statusCode, message) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    user,
  });
};

export const protect = catchAsync(async (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  let token;

  if (tokenHeader && tokenHeader.startsWith('Bearer')) {
    token = tokenHeader.split(' ')[1];
  }

  if (!token) next(new AppError('You have to login before accessing it.'));

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(id).select('+password');
  if (!user) next(new AppError('There is no user with this ID.'));

  req.user = user;
  next();
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError('Please provide us email and password', 400);

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('There is no user with this email', 400);

  if (!(await user.correctPassword(password, user.password)))
    throw new AppError('Wrong password', 400);
  const message = 'Welcome to chat app!';
  sendToClient(user, res, 200, message);
});

export const signup = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });
  const message = 'Create account successfully!';
  sendToClient(user, res, 201, message);
});

export const updatePassword = catchAsync(async (req, res) => {
  const user = req.user;

  const { currentPassword, password, passwordConfirm } = req.body;

  if (!currentPassword || !password || !passwordConfirm)
    throw new AppError(
      'Please provide us currentPassword, password and passwordConfirm',
      400
    );

  if (!(await user.correctPassword(currentPassword, user.password)))
    throw new AppError('Wrong password', 400);

  if (password !== passwordConfirm)
    throw new AppError('Password and passwordConfirm must be equals');

  user.password = password;
  await user.save({ validateBeforeSave: false });

  const message = 'Update password successfully!';
  sendToClient(user, res, 200, message);
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `http://localhost:5173/resetPassword/${resetToken}`;
    // await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL} .If you didn't forget your password, please ignore this email!`,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();

  const message = 'Your password is updated!';
  sendToClient(user, res, 200, message);
});
