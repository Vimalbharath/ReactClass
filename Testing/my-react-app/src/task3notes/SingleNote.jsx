function SingleNote(prop) {
    const{id,note,removeNote}=prop;
  return (
    <div>
        {id+1 }:
        {note}
        <button onClick={()=>removeNote(id)}>Delete</button>
    </div>
  );
}

export default SingleNote;