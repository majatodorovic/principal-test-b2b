'use client';

import { sendContactRequest } from '@/app/services/api/contact';
import { useState } from 'react';

export default function Form({ data }: any) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customer_name = `${formData.firstName} ${formData.lastName}`;

    const requestData = {
      page_section: 'contact_page',
      customer_name: customer_name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    await sendContactRequest(requestData);
  };

  const inputFields = [
    {
      name: 'firstName',
      type: 'text',
      value: formData.firstName,
      placeholder: data.form.firstName,
    },
    {
      name: 'lastName',
      type: 'text',
      value: formData.lastName,
      placeholder: data.form.lastName,
    },
    {
      name: 'phone',
      type: 'tel',
      value: formData.phone,
      placeholder: data.form.phone,
    },
    {
      name: 'email',
      type: 'email',
      value: formData.email,
      placeholder: data.form.email,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {inputFields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="inputRounded"
          />
        ))}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="inputRounded !rounded-3xl sm:col-span-2"
          rows={7}
          placeholder={data.form.message}
        />
      </div>
      <button type="submit" className="mainButton w-full sm:w-[200px]">
        {data.form.sendButton}
      </button>
      <p
        className="text-sm text-blue sm:max-w-[75%]"
        dangerouslySetInnerHTML={{ __html: data.form.footnote }}
      />
    </form>
  );
}
