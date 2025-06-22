const NameList = () => {
    
    const catogeries = ['JS','Python','Devops'];
    
    return (
        <div>
            {
                catogeries.map(catg => <h2>{catg}</h2>)
            }
        </div>
    )

}

export default NameList