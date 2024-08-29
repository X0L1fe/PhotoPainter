from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email, Length, EqualTo
import email_validator

class LoginForm(FlaskForm):
    login_email = StringField('Login_Email', validators=[DataRequired(message='Это поле обязательно для заполнения')])
    password = PasswordField('Пароль:', validators=[DataRequired(message='Это поле обязательно для заполнения'), Length(min=6, max=20)])
    remember_me = BooleanField('Запомнить меня')

    
class RegisterForm(FlaskForm):
    login = StringField('Login', validators=[DataRequired()])
    email = StringField('Email', validators=[Email()])
    password = PasswordField('Пароль:', validators=[DataRequired(), Length(min=6, max=20)])
    repeat_password = PasswordField('Повторите пароль:', validators=[DataRequired(), Length(min=6, max=20)])
    remember_me = BooleanField('Запомнить меня')

class PasswordResetForm(FlaskForm):
    email = StringField('Email', validators=[Email()])

class ResetPasswordForm(FlaskForm):
    password = PasswordField('Пароль:', validators=[DataRequired(), Length(min=6, max=20)])
    repeat_password = PasswordField('Повторите пароль:', validators=[DataRequired(), Length(min=6, max=20)])