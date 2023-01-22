using Server.Models;

namespace Server.Interfaces
{
    public interface IBookingRepository
    {
        void AddBooking(Booking input);

        Task<IEnumerable<Booking>> GetAllAsync();

        Task<IEnumerable<Booking>> GetAllByRoomNumberAsync(int roomNumber);

        Task<Booking> GetByIdAsync(int id);

        void RemoveBooking(Booking input);

        Task<bool> ModifyAndSaveAsync(Booking request);

        Task<bool> SaveAsync();
    
    }
}
