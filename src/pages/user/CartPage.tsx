import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cart/CartContext';
import { Button } from 'react-daisyui';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdOutlinePayment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { selectedSeats, removeSeat, clearSeats, totalPrice } = useCart();
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const newCountdowns: { [key: string]: number } = {};
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)

    selectedSeats.forEach(ticket => {
      const storedStartTime = localStorage.getItem(`startTime_${ticket._id}`);
      const countdownDuration = 20; // 600 giây

      if (storedStartTime) {
        const startTime = parseInt(storedStartTime, 10);
        const elapsedTime = currentTime - startTime; // Tính thời gian đã trôi qua

        const remainingTime = countdownDuration - elapsedTime; // Tính thời gian còn lại
        newCountdowns[ticket._id] = remainingTime > 0 ? remainingTime : 0; // Nếu còn thời gian thì gán, ngược lại gán 0
      } else {
        // Nếu không có thông tin, khởi tạo countdown mới
        newCountdowns[ticket._id] = countdownDuration;
        localStorage.setItem(`startTime_${ticket._id}`, currentTime.toString()); // Lưu thời gian bắt đầu
      }
    });

    setCountdowns(newCountdowns);

    const intervalId = setInterval(() => {
      setCountdowns(prevCountdowns => {
        const updatedCountdowns = { ...prevCountdowns };
        let allRemoved = true;
        Object.keys(updatedCountdowns).forEach(ticketId => {
          if (updatedCountdowns[ticketId] > 1) {
            updatedCountdowns[ticketId] -= 1;
            allRemoved = false;
          } else {
            const seatId = selectedSeats.find(ticket => ticket._id === ticketId)
              ?.seat_id[0]?._id;
            if (seatId) {
              removeSeat(ticketId, seatId);
              localStorage.removeItem(`startTime_${ticketId}`); // Xóa thông tin thời gian bắt đầu khi xóa ghế
            }
            delete updatedCountdowns[ticketId];
          }
        });

        // Lưu countdowns vào localStorage
        localStorage.setItem('countdowns', JSON.stringify(updatedCountdowns));

        if (allRemoved) clearInterval(intervalId);
        return updatedCountdowns;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedSeats, removeSeat]);

  return (
    <div className="mb-5 w-full rounded-md bg-white text-black dark:bg-transparent dark:text-white">
      <h1 className="mx-2 mb-5 border-[4px] border-b-0 border-r-0 border-t-0 border-primary bg-blue-200 px-5 py-1 text-center text-xl text-black dark:border-white dark:bg-gray-400 dark:text-white xl:text-start">
        Giỏ vé - Số lượng:&nbsp; {selectedSeats.length}
      </h1>
      {selectedSeats.length === 0 ? (
        <>
          <div className="text-center">
            <p className="text-red-400">Giỏ vé của bạn đang trống!</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            {selectedSeats.map(ticket => (
              <div
                key={ticket._id}
                className="flex items-center justify-between border border-b border-l-0 border-r-0 border-t-0 p-2 text-xs"
              >
                <div className="flex flex-col items-start justify-start">
                  <p className="flex gap-1">
                    {ticket.trip_id.departure_point.name}
                    <span>-</span>
                    {ticket.trip_id.destination_point.name}
                  </p>
                  <p>
                    {new Date(ticket.trip_id.departure_date).toLocaleDateString(
                      'vi-VN'
                    )}
                  </p>
                  <p>{ticket.trip_id?.departure_time}</p>
                  <p>{ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name}</p>
                  <p>{ticket.seat_id[0]?.seat_catalog_id.name}</p>
                  <p>{ticket.seat_id[0]?.name}</p>
                  <p>
                    {(ticket.price * 1000).toLocaleString('vi-VN')}
                    &nbsp;VND
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p
                    onClick={() => {
                      const seatId = ticket.seat_id[0]?._id;
                      if (seatId) {
                        removeSeat(ticket._id, seatId);
                      }
                    }}
                    className="cursor-pointer text-2xl text-red-500"
                  >
                    <IoIosCloseCircleOutline />
                  </p>
                  <span className="text-red-500">
                    {countdowns[ticket?._id]} giây
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-end text-xs font-bold">
              Tổng tiền: {(totalPrice * 1000).toLocaleString('vi-VN')}
              &nbsp;VND
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              <Button
                size="sm"
                onClick={clearSeats}
                className="bg-red-500 text-xs text-white"
              >
                Xóa tất cả
              </Button>
              <Button
                onClick={() => navigate('/checkout')}
                size="sm"
                className="bg-green-500 text-xs text-white"
              >
                <MdOutlinePayment className="text-xl" />
                Mua vé
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
