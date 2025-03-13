import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Button, Input, Card } from '../components/ui';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setError 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      // Set form-level error
      setError('root', {
        type: 'manual',
        message: error.message || 'Invalid credentials'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg space-y-6 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <Input
              label="Username"
              {...register('username')}
              error={errors.username?.message}
              placeholder="Username"
              disabled={isSubmitting}
              autoComplete="username"
              className="text-sm sm:text-base"
            />
            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Password"
              disabled={isSubmitting}
              autoComplete="current-password"
              className="text-sm sm:text-base"
            />
          </div>

          {errors.root && (
            <div className="text-xs sm:text-sm text-center text-red-600 bg-red-50 p-2 rounded">
              {errors.root.message}
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              variant="primary"
              className="w-full text-sm sm:text-base py-2.5"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign in
            </Button>

            <p className="text-xs sm:text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login; 