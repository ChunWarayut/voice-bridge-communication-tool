import { motion } from 'framer-motion';

const ShakeButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <motion.div
      whileTap={{
        rotate: [0, -10, 10, -10, 10, 0], // หมุนสลับซ้ายขวาเบาๆ
        transition: { duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ShakeButton;