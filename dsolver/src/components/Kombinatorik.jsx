import React, { useState, useEffect, Fragment } from 'react'
import  { Button, message, Row, Col, Input, Select, Upload, InputNumber, Typography, Dropdown, Space, Menu } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Navigate } from "react-router-dom";







const { Option } = Select;
const { Title, Text } = Typography;



function Kombinatorik() {
    const [kind, setKind] = useState("")
    const [calculated, setCalculated] =useState(false);
    const [result, setResult] = useState(0);

    
  const [kInput, setKInput] = useState("")
  const [nInput , setNInput] = useState("")
  const kof = [{ 
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
 ]

  const [paragraphs, setParagraphs] = useState([{title : "", content : ""}])
    // done 
  const [thumbnail, setThumbnail] = useState(null)
  const [preview, setPreview] = useState(null)

  const [loading, setLoading] = useState(false)

  const [selectedTags, selectTag ] = useState([])
  const [selectedCat, selectCat] = useState("")

  const [postId, setPostId] = useState(null)

  useEffect(() => {

  }, [])

  const addNewParagraph = () => {
      setParagraphs([...paragraphs, {title : null, content : null}])
  }

  const handleParagraphChange = (i, e) => {
      const newParagraphs = [...paragraphs]
      newParagraphs[i][e.target.name] = e.target.value 
      setParagraphs(newParagraphs)
  }

  const removeParagraph = (i) => {
    const newParagraphs = [...paragraphs]
    newParagraphs.splice(i, 1)
    setParagraphs(newParagraphs)
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    console.log(img)
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else {
      setThumbnail(file)
    }
    
    return isJpgOrPng;
  }
 

  function calculate(){
    setCalculated(true);
    console.log('abc')
    if(nInput === "" || kInput === ""){
        console.log("keine nummern eingegeben")
      }
      else{
    
        if(kind === 's1'){
            setResult(calcs1(nInput, kInput));

        }

      
        
      }
  }
  function calcs1(n, k){
    if(n===k){
        return 1;
    }
    if(n===0){
        return 0;
    }
    return calcs1(n-1, k-1) + calcs1(n-1,k)*(n-1)

  }



  
  return (
    <> 
    

<Row justify={"center"} className="mb-2">

    <Col xs={24} >
        <Title style={{"textAlign":"center"}} level={4}>Kombinatorik Calculator</Title>
        <Row justify={"center"}>
          <Col xs={12}>
            <form className='input_group mb-2' >
            
            <div className='input_number'>
            <Select
                        onChange={(e) => { setKind(e) }}
                        options={[
                            { value: 's1', label: 'Stirling Zahlen 1. Art' },
                            { value: 's2', label: 'Stirling Zahlen 2. Art' },
                            { value: 'p', label: 'P n,k' },
                        ]}

                        placeholder={"Auswählen..."}
                    />
              
              <InputNumber value={nInput} onChange={(value) => {setNInput(value)}} placeholder='n'/>
              <InputNumber value={kInput} onChange={(value) => {setKInput(value)}} placeholder='k'/>
              <Button className="submit-btn" type="primary" onClick={calculate} disabled={(nInput === "" || kInput === "")}>Calculate</Button>
            </div>
            
          </form>
          </Col>
        </Row>
    
    </Col>
</Row> 
{calculated ? (
          <Row gutter={[0, 8]} justify={"center"} className="mb-4">
            <Col xs={14}>
                  <Button>{kind}: {result}</Button>
              </Col>
           
          </Row>
     
            
     
         ) : (<></>)}
</>
  )

      
}

export default Kombinatorik