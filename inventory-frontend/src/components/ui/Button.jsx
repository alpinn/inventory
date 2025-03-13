const Button = ({ 
    children, 
    type = 'button', 
    variant = 'primary', 
    size = 'md',
    className = '',
    isLoading = false,
    disabled = false,
    ...props 
  }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
    
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
    };
  
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };
  
    const loadingState = isLoading ? "opacity-75 cursor-wait" : "";
    const disabledState = disabled ? "opacity-50 cursor-not-allowed" : "";
  
    return (
      <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${loadingState} ${disabledState} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  };
  
  export default Button;