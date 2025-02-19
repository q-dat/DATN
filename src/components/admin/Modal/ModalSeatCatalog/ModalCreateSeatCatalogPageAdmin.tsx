import React, { useContext } from 'react';
import { Button, Select } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { Toastify } from '../../../../helper/Toastify';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';
import { ISeatCatalog } from '../../../../types/type/seat-catalog/seat-catalog';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalCreateSeatCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateSeatCatalogPageAdmin: React.FC<
  ModalCreateSeatCatalogProps
> = ({ isOpen, onClose }) => {
  const { getAllSeatCatalogs, createSeatCatalog } =
    useContext(SeatCatalogContext);
  const { register, handleSubmit, reset } = useForm<ISeatCatalog>();
  const { vehicles } = useContext(VehicleContext);
  const onSubmit: SubmitHandler<ISeatCatalog> = async formData => {
    try {
      await createSeatCatalog(formData);
      Toastify('Tạo danh mục chỗ ngồi thành công!', 201);
      reset();
      onClose();
      getAllSeatCatalogs();
    } catch (error) {
      getAllSeatCatalogs();
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Danh mục chỗ ngồi đã tồn tại!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo khoang/toa mới
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên khoang/toa"
            />
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('vehicle_id._id')}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {vehicles.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                  &emsp; {vehicle?.des}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button color="primary" type="submit" className="text-white">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreateSeatCatalogPageAdmin;
