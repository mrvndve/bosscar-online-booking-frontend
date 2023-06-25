import { useForm } from 'react-hook-form';

const useOtpModal = ({ onOtpVerify }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async data => {
    onOtpVerify(data.otp);
  };

  return {
    register,
    fieldErrors: errors,
    handleSubmit,
    onSubmit,
  }
};

export default useOtpModal;