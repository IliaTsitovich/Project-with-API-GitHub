type PropsImageComponent ={
    image: string,
    classNameImage: string,
    classNameContainerForImage?: string,
    title: string

}

function AnyImage({...props}:PropsImageComponent){

    const {image, classNameImage,title,classNameContainerForImage}= {...props}
    return (
        <div className={classNameContainerForImage} >
            <img 
                src={image}
                alt={title}
                className={classNameImage}/>
        </div>
    )
}

export default AnyImage;