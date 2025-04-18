import { motion } from 'framer-motion';

const BouncyButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }} // ขนาดเล็กลงนิดเมื่อคลิก
      whileHover={{ scale: 1.05 }} // ขยายเบาๆ เมื่อ hover
      className="p-4 bg-red-200 hover:border-red-200 focus:border-red-200 text-gray-900 rounded-xl shadow-md"
    >
      {children}
    </motion.button>
  );
};

export default BouncyButton;