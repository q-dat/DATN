import React, { useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';
import axios from '../../config/axiosConfig';
import { isIErrorResponse } from '../../types/error/error';
import { Toastify } from '../../helper/Toastify';
import { useNavigate } from 'react-router-dom';

const CheckInvoiceCodePage: React.FC = () => {
  const { t } = useTranslation();
  const [contactInfo, setContactInfo] = useState('');
  const navigate = useNavigate();

  const handleCheckInvoiceCodePage = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
    const isPhone = /^[0-9]{10,15}$/.test(contactInfo);

    if (!isEmail && !isPhone) {
      Toastify('Email hoặc số điện thoại không hợp lệ', 500);
      return;
    }

    try {
      const requestData = isEmail ? { email: contactInfo } : { phone: contactInfo };
      await axios.post('api/order/forgot-invoice-code', requestData);

      Toastify('Mã hóa đơn đã được gửi tới email của bạn', 200);
      navigate('/check-ticket');
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Thông tin không chính xác hoặc mã hóa đơn đã hết hạn';
      Toastify(`${errorMessage}`, 500);
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <HeaderResponsive
        Title_NavbarMobile={t('UserPage.Navbar.CheckInvoiceCodePage')}
      />
      <div className="w-full">
        {/*  */}
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold uppercase text-black dark:text-white">
            {t('UserPage.CheckInvoiceCodePage.NotificationTitle')}
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleCheckInvoiceCodePage}>
          <div className="my-5">
            <div className="flex flex-col items-center justify-center px-2 md:px-0 lg:gap-5">
              <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-white p-4 md:w-auto">
                <p className="m-2 mb-4 text-xl font-light text-black">
                  {t('UserPage.CheckInvoiceCodePage.title')}
                </p>
                <InputForm
                  type="text"
                  placeholder={`${t('UserPage.CheckInvoiceCodePage.EmailOrPhonePlaceholder')}`}
                  value={contactInfo}
                  onChange={e => setContactInfo(e.target.value)}
                  className="border border-gray-300 bg-white text-black focus:border-primary xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                />
                <Button
                  className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                  size="md"
                >
                  {t('UserPage.CheckInvoiceCodePage.buttonform')}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* Notification */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 xl:px-10">
          <p className="mb-4 text-lg">
            {t('UserPage.CheckTicketPage.NotificationOne')}
          </p>
          <p className="text-lg">
            {t('UserPage.CheckTicketPage.NotificationTwo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInvoiceCodePage;
