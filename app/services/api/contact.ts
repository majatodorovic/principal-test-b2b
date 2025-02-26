import { post } from '@/app/api/api';
import toast from 'react-hot-toast';

export const sendContactRequest = async (formData: any) => {
  const response = await post(
    '/b2c/contact/contact_page?form_section=contact_page',
    formData,
  );

  if (response?.success) {
    toast.success(response?.payload?.message);
  } else {
    const errorMessages = response?.payload?.fields?.map(
      (field: { name: string; error: string }) => field.error,
    );

    if (errorMessages && errorMessages.length > 0) {
      toast.error(errorMessages.join('\n'));
    } else {
      toast.error(response.message);
    }
  }
};
