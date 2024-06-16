export default function Home() {
  return (
    <main className="flex lg:flex-col justify-center items-center gap-8 m-auto max-w-4xl min-h-full">
      <div className="bg-indigo-100 shadow-xl w-96 card">
        <div className="card-body">
          <label className="form-control w-full max-w-xs">
            <span className="label-text"> </span>
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-primary file-input-sm"
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="label-text"> </span>
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-primary file-input-sm"
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="label-text"> </span>
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-primary file-input-sm"
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="label-text"> </span>
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-primary file-input-sm"
            />
            <div className="label"></div>
          </label>
          {/* <div className="justify-start card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
        </div>
      </div>
      <div className="">preview</div>
    </main>
  );
}
