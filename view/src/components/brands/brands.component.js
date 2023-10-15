export const BrandShow = ({data}) => {
    console.log('data', data);
    return(
        <>
            {
                (data.map((item) => 
                    item.title  
                ))
            }
        </>
    )
}