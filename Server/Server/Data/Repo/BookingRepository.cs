using Server.Interfaces;
using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data.Repo
{
    public class BookingRepository : IBookingRepository
    {
        private readonly DataContext _context;

        public BookingRepository(DataContext context)
        {
            _context = context;
        }

        public void AddBooking(Booking input)
        {
                _context.Bookings.Add(input);
        }

        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
                var res = await _context.Bookings.ToListAsync();
                return res;        
        }

        public async Task<IEnumerable<Booking>> GetAllByRoomNumberAsync(int roomNumber)
        {
                var res = await _context.Bookings.Where(x => x.RoomNumber == roomNumber).ToListAsync();
                return res;
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
                var res = await _context.Bookings.Where(x => x.Id == id).FirstOrDefaultAsync();
                return res;      
        }

        public async Task<bool> ModifyAndSaveAsync(Booking request)
        {
            _context.Entry(request).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public void RemoveBooking(Booking input)
        {
            _context.Remove(input);
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
