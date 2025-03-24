
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Button from './Button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

// Define the schema based on the form type
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type FormValues = LoginFormValues | RegisterFormValues;

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (values: FormValues) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const schema = type === 'login' ? loginSchema : registerSchema;
  
  // Use the correct type based on the form type
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: type === 'login' 
      ? { email: '', password: '' } 
      : { name: '', email: '', password: '', confirmPassword: '' },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {type === 'register' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      {...field} 
                      className={cn(
                        "input-focus-effect",
                        // Only check for name error if we're in register form
                        type === 'register' && form.formState.errors.name && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    type="email" 
                    {...field} 
                    className={cn(
                      "input-focus-effect",
                      form.formState.errors.email && "border-destructive"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      placeholder={type === 'register' ? "Create a secure password" : "Enter your password"} 
                      type={showPassword ? "text" : "password"} 
                      {...field} 
                      className={cn(
                        "input-focus-effect pr-10",
                        form.formState.errors.password && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {type === 'register' && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password" 
                        type={showConfirmPassword ? "text" : "password"} 
                        {...field} 
                        className={cn(
                          "input-focus-effect pr-10",
                          // Only check for confirmPassword error if we're in register form
                          type === 'register' && form.formState.errors.confirmPassword && "border-destructive"
                        )}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {type === 'login' && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
            disabled={loading}
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
