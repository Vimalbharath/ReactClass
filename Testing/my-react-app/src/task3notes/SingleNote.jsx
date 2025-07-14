function SingleNote(prop) {
    const{id,text,removeNote}=prop;
  return (
    <div>
        {/* {id }: */}
        {text}
        <button onClick={()=>removeNote(id)}>Delete</button>
    </div>
  );
}

export default SingleNote;