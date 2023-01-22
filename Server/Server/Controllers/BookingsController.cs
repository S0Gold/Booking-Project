using Microsoft.AspNetCore.Mvc;
using Server.Interfaces;
using Server.Models;
using System.Data.Entity.Infrastructure;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _repo;
        

        public BookingsController(IBookingRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("GetAllBookings")]
        public async Task<ActionResult<List<Booking>>> Get()
        {
            try
            {
                var bookings = await _repo.GetAllAsync();
                if (bookings == null)
                    return BadRequest("Nicio rezervare inregistrata");

                return Ok(bookings);
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
           
        }

        [HttpGet("GetBookingById/{id}")]
        public async Task<ActionResult<Booking>> Get(int id)
        {
            try
            {
                var booking = await _repo.GetByIdAsync(id);
                if (booking == null)
                    return NotFound();

                return Ok(booking);
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
           
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Booking request)
        {
            if (request == null)
                return BadRequest("Null parameters");

            try
            {
                var bookingsOnRoom = await _repo.GetAllByRoomNumberAsync(request.RoomNumber);

                request.StartDate = request.StartDate.AddHours(2);
                request.StopDate = request.StopDate.AddHours(2);

                if (bookingsOnRoom != null)
                {
                    foreach (Booking booking in bookingsOnRoom)
                    {
                        if (request.StartDate < booking.StopDate && request.StopDate > booking.StartDate)
                        {
                                return BadRequest("Camera indisponibila in intervalul selectat");
                        }
                    }
                }
                
                _repo.AddBooking(request);
                await _repo.SaveAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
              
        }

        [HttpPut("ModifyBooking/{id}")]
        public async Task<IActionResult> Put(int id, Booking request)
        {
            if (request == null || id == null)
                return BadRequest("Null parameters");

            var booking = await _repo.GetByIdAsync(id);
            if (booking == null)
                return NotFound();

            booking.FirstName = request.FirstName;
            booking.LastName = request.LastName;
            booking.RoomNumber = request.RoomNumber;
            booking.StopDate = request.StopDate.AddHours(2);
            booking.StartDate = request.StartDate.AddHours(2);
            booking.Cnp = request.Cnp; 
            booking.PhoneNumber = request.PhoneNumber;

            try
            {
                var bookingsOnRoom = await _repo.GetAllByRoomNumberAsync(request.RoomNumber);

                request.StartDate = request.StartDate.AddHours(2);
                request.StopDate = request.StopDate.AddHours(2);

                if (bookingsOnRoom != null)
                {
                    foreach (Booking element in bookingsOnRoom)
                    {
                        if (request.StartDate < element.StopDate && request.StopDate > element.StartDate)
                        {
                            return BadRequest("Camera indisponibila in intervalul selectat");
                        }
                    }
                }

                await _repo.ModifyAndSaveAsync(booking);
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

        }

        [HttpDelete("RemoveBooking/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null)
                return BadRequest("Null parameters");

            try
            {
                var booking = await _repo.GetByIdAsync(id);
                if (booking == null)
                    return NotFound();

                _repo.RemoveBooking(booking);
                await _repo.SaveAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
            
        }


    }
}
