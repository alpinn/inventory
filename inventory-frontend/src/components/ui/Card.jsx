const Card = ({ 
  children, 
  title, 
  className = '',
  padding = true,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white shadow rounded-lg overflow-hidden
        ${padding ? 'p-6' : ''} 
        ${className}
      `}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card; 