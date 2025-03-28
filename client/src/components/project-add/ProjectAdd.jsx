
export default function ProjectAdd() {
    return (
        <div className="form-container">
            <h2>Add Project</h2>
            <form action="dashboard.html" method="POST">
                <div className="input-group">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Year of Construction</label>
                    <input type="number" id="construction" name="construction" required />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Year of Demolition</label>
                    <input type="number" id="demolition" name="demolition" required />
                </div>
                
                <button type="submit">Add</button>
            </form>
        </div>
    )
}