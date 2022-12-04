
const heads = ["id","name", "age", "status"]
const addUser = document.querySelector('#addUser')
const dataWrap = document.querySelector("#dataWrap")


const readDataFromStorage = (itemKey="users",resType="json") =>{
    let data = localStorage.getItem(itemKey)
    if(resType=="json") {
        try{
            data = JSON.parse(data)||[]
        }
        catch(e){
            data = []
        }
    }
    return data
}

const writeDataToStorage = (data,itemKey="users")=> localStorage.setItem(itemKey, JSON.stringify(data))

const createEle = (ele)=>{
   
    const div = document.createElement("div")
    const id = document.createElement("h1")
    id.innerText = ele.id
    div.appendChild(id)
    const name = document.createElement("h1")
    name.innerText = ele.name
    div.appendChild(name)

    const age = document.createElement("h1")
    age.innerText = ele.age
    div.appendChild(age)

    const status = document.createElement("h1")
    status.innerText = ele.status
    div.appendChild(status)

    const edit = document.createElement('button')
    edit.innerText = 'edit'
    edit.addEventListener('click',()=>{editData(ele)})
    div.appendChild(edit)
    return(
        div
    )

}

const editData = (ele)=>{

    const data = readDataFromStorage()
    console.log(data)
    let eleIndex=''
    // let element = ele
    data.find((element,index)=>{
        if(element.id==ele.id)
        {
            eleIndex=index
            console.log(index)
            heads.forEach(h=> addUser.elements[h].value =element[h])
        }
    })
    addUser.addEventListener('submit',(e)=>{
        e.preventDefault()
        const user = {}
        heads.forEach(h=> user[h]= addUser.elements[h].value)
        data[eleIndex]=user;
        console.log(data)
        writeDataToStorage(data)
        display()
    })

    
    // heads.forEach(h=> addUser.elements[h].value =element[h])

}


if(addUser) addUser.addEventListener("submit", (e)=>{
    e.preventDefault()
    const user = {}
    heads.forEach(h=> user[h]= addUser.elements[h].value)
    const data = readDataFromStorage()
    data.push(user)
    writeDataToStorage(data)
    display()
    
})
const display=()=>{
    dataWrap.innerHTML=''
    const data = readDataFromStorage()
    data.forEach(d=>{
        dataWrap.appendChild(createEle(d))
    })
}
display()

// localStorage.clear()