import { useState, useEffect } from "react";

function Venues() {
  const [venues, setVenues] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch("https://sis.materdeicollege.com/api/venues")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVenues(data.venues);
        setSchedules(data.schedules);
      });
  }, []);

  useEffect(() => {
    fetch("https://sis.materdeicollege.com/api/venues/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSchedules(data.schedules);
      });
  }, [id]);

  const handleClick = (id) => {
    setId(id);
  };
  return (
    <div className="d-flex align-item-center justify-content-between">
      <div className="col-md-3" style={{ height: "100vh", overflow: "auto" }}>
        <h1 className="bg-warning text-white text-center">Venues</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Building</th>
              <th scope="col">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {venues?.map((venue, index) => (
              <tr key={index} onClick={() => handleClick(venue.id)}>
                <td>{venue.id}</td>
                <td>{venue.name}</td>
                <td>{venue.building}</td>
                <td>{venue.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-9" style={{ height: "100vh", overflow: "auto" }}>
        <h1 className="bg-success text-white text-center">Mater Dei College</h1>
        {schedules && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Course no.</th>
                <th scope="col">Description</th>
                <th scope="col">Schedule</th>
                <th scope="col">Size</th>
                <th scope="col">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {schedules?.map((sched, index) => (
                <tr key={index} onClick={() => handleClick(sched.id)}>
                  <td>{sched.course_no}</td>
                  <td>{sched.description}</td>
                  <td>{sched.schedule}</td>
                  <td>{sched.size}</td>
                  <td>{sched.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Venues;
