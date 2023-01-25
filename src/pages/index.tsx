import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'


export default function Home() {
  // 노션용
  const [products, setProducts] = useState<{id:string; properties:{id:string}[]}[]>([])
  const nameRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const detailRef = useRef<HTMLInputElement>(null)

  // GET
  useEffect(() => {
    fetch('/api/get-items')
      .then(res => res.json())
      .then(data => setProducts(data.items))
  }, []);


  // POST
  const HandleClick = () => {
    if(nameRef.current == null || nameRef.current.value ==''){
      alert('name을 넣어주세요')
      return
    }
    if(titleRef.current == null || titleRef.current.value ==''){
      alert('title을 넣어주세요')
      return
    }
    if(detailRef.current == null || detailRef.current.value ==''){
      alert('detail을 넣어주세요')
      return
    }
    fetch(`/api/add-item?name=${nameRef.current.value}&title=${titleRef.current.value}&detail=${detailRef.current.value}`)
      .then(res => res.json())
      .then(data => alert(data.message))
  }

  return (
    <>
      <p>문의하기</p>
      {
        products &&
        products.map(item => (
          <div key={item.id}>
            {JSON.stringify(item)}
            {item.properties &&
              Object.entries(item.properties).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    fetch(
                      `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                    )
                      .then((res) => res.json())
                      // .then((data) => alert(JSON.stringify(data.detail)))
                      .then((data) => alert(JSON.stringify(data.detail)))
                  }}
                >
                  {key}
                </button>
            ))}
            <br />
            <br />
          </div>
        ))
      }
      <div>
        <input type="text" ref={titleRef} placeholder='제목' /><br />
        <input type="text" ref={nameRef} placeholder='이름' /><br />
        <input type="text" ref={detailRef} placeholder='내용' /><br />
        <button onClick={HandleClick}>문의신청</button>
      </div>
    </>
  )
}