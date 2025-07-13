function SingleNote(prop) {
    const{id,note}=prop;
  return (
    <div>
        {id+1 }:
        {note}
        <button>Delete</button>
    </div>
  );
}

export default SingleNote;