import React, { useState, useEffect, Fragment } from 'react'
import  { Button, message, Row, Col, Input, Select, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Navigate } from "react-router-dom";






const { Option } = Select;


function Kombinatorik(props) {

    // done
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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, thumbnail =>
        {
            setPreview(thumbnail)
            setLoading(false)
        },
      );
    }
  }

  const submit = async () => {
  }

  
  return (
    <>  

      {postId !== null ? (
        <Navigate to={`/posts/detail/${postId}`} push />
      ) : ("")}
        <Row gutter={[12,12]} className="form-row">
        {paragraphs.map((item, i) => {
            return (
                <Fragment key={i}>
                    
                      <Col xl={22} lg={21} md={20} sm={19} xs={18}>
                        <Input 
                            name='title'
                            placeholder={`Title ${i + 1}`}
                            onChange={(e) => { handleParagraphChange(i, e) }}
                            />
                      </Col>
                      <Col xl={2} lg={3} md={4} sm={5} xs={6}>
                          <Button type="danger"
                                  ghost
                                  style={{width: "100%"}}
                                  onClick={() => removeParagraph(i)}
                                  >
                                      Remove
                          </Button>
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Input.TextArea rows={4}/>
                      </Col>
                    
                </ Fragment>
            )
        })}
        </Row>
        <Row className="form-row">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Button type="primary"
                        style={{width: "100%"}}
                        onClick={() => addNewParagraph()}
                        >
                            Add Paragraph
                </Button>
            </Col>
            
        </Row>
        <Row gutter={[12, 12]} className="form-row">
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Category"
                        optionFilterProp="children"
                        onChange={e => selectCat(e)}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                    
                      <Option key={1} value={1}>25</Option>
              
                </Select> 
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Select mode="tags" 
                        style={{ width: '100%' }} 
                        onChange={(e) => { selectTag(e) }} 
                        placeholder={"Tags"}
                        tokenSeparators={[',']}
                        >
                      
                          <Select.Option key={1} value={1}>
                            252
                          </Select.Option>
                
                </Select>
            </Col>
        </Row>
        <Row className='form-row'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                   
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => {
                          onSuccess("ok");
                        }, 0);
                      }}
                >
                    {preview ? <img src={preview} alt="avatar" style={{ width: '100%' }} /> : (
                    <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>
                            Upload
                        </div>
                    </div>)}
                </Upload> 
            </Col>
        
        </Row>
        <Row className='form-row'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Button type="btn"
                            style={{width: "100%", color : "white", background: "#73d13d" }}
                            onClick={() => submit()}
                            >
                            Submit
                </Button>
            </Col>
        </Row>
        
        {/* Automatic tokenization */}
    </>
  )
}

export default Kombinatorik