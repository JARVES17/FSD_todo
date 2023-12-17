using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.ConEntity;
using ToDoApp.Model;

namespace ToDoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController:ControllerBase
    {
        private readonly DataContext _data;
        public ListController(DataContext data)
        {
            Console.WriteLine("Hello");
            Console.WriteLine(data);
            _data = data;
        }

        [HttpPost("post")]
        public async Task<ActionResult> AddData(ListTable obj)
        {
            await _data.AddAsync(obj);
            await _data.SaveChangesAsync();
            
            return Ok();


        }
        [HttpGet("get")]
        public async Task<List<ListTable>> GetData()
        {

            return await _data.ListTables.ToListAsync();

        }
        [HttpDelete("Delete")]
        public async Task<ActionResult> Delete(int reqId)
        {

            var result = await _data.ListTables.FirstOrDefaultAsync(f => f.Id == reqId);
            if (result == null)
            {
                return BadRequest();
            }
            _data.Remove(result);
            await _data.SaveChangesAsync();
            return Ok();

        }
        [HttpPatch("Patch")]
        public async Task<ActionResult<ListTable>> Modify(int reqId,ListTable obj)
        {
            var result = await _data.ListTables.FirstOrDefaultAsync(f => f.Id == reqId);
            if (result == null)
            {
                return BadRequest();
            }
            result.Tasks = obj.Tasks;
            await _data.SaveChangesAsync();

            return Ok(result);

        }
    }
}
