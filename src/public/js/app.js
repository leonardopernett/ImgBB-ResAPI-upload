
const file = document.getElementById('file');
const imagePreview= document.querySelector('#image-preview');
const renderImage = document.getElementById('render-img')

file.addEventListener('change',(e)=>{
     const selectedImg = e.target.files[0]
     if(selectedImg){

         //presuavilizacion image
         const render = new FileReader() 
         render.readAsDataURL(selectedImg)
         render.onloadend = ()=>{
             //se crear en el dom 
            const div = document.createElement('div')
            div.className="card card-body"

            const img = document.createElement('img')
            img.className="card-img-top"

            img.setAttribute('src',render.result)//inserta src 
            div.appendChild(img);
            renderImage.appendChild(div)
         }
         
     }
})