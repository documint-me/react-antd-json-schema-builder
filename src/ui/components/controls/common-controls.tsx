import React, { useMemo } from 'react'
import traverse from 'json-schema-traverse'
import { CaretDownFilled, CaretRightFilled, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Select, Typography, Tooltip } from 'antd'
import { isFunction } from 'lodash'
import { schemaTypes } from '../../../helpers/constants'
import {
  deleteSchemaProperty,
  getSchemaItems,
  renameSchemaProperty,
  setSchemaItems,
  setSchemaProperty,
} from '../../../helpers/schema'
import useControls from '../../../hooks/useControls'
import { useSchemaContext } from '../../../context/schema-context'
import { CommonControlsProps } from '../../../types'
// import SchemaOptions from '../schema-options'
import CommonSubArray from './common-sub-array'
import CommonSubObject from './common-sub-object'
import CommonSubCollection from './common-sub-collection'
import Icon from '../type-icons'
import NewPropertyButton from './new-property-button'
import { Schema } from '../../../types'
import validateFieldName from '../../../helpers/validate-field-names'

const { Title, Text } = Typography
const doNothing = () => {}

export function findMatchingChildNode(schema: Schema, query: string) {
  if (!query) return true

  const foundNodes: string[] = []
  traverse(schema, {}, (_schema, _parent, _root, _parentJSONParent, _parentKeyword, _parentSchema, keyIndex) => {
    if (!keyIndex) return

    String(keyIndex).includes(query) && foundNodes.push(String(keyIndex))
  })

  return foundNodes.length > 0
}

const CommonControls: React.FC<CommonControlsProps> = ({
  schema,
  schemaKey,
  rootNode,
  controlType,
  disabledInput,
  onAdd,
  onDelete,
  onChange,
  onChangeKey,
}) => {
  const {
    getTypeOptions,
    show,
    showModal,
    schemaType,
    valid,
    setValid,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
    isParentArray,
  } = useControls({
    schema,
    schemaKey,
    rootNode,
    onChange,
    onChangeKey,
  })
  const { search } = useSchemaContext()

  const isCollection = controlType !== 'primitive'
  const isColl = controlType === 'collection'
  const isObject = controlType === 'object'
  const isArray = controlType === 'array'

  const nameColProps = { xs: 16, xl: 16 }
  const typeColProps = { xs: 6, xl: 6 }
  const actionColProps = { xs: 2, xl: 2 }

  const isNodeVisible = useMemo(
    () =>
      !search ||
      !schema.id ||
      Boolean(schema.id && (schema.id as string).includes(search)) ||
      findMatchingChildNode(schema, search),
    [schema, search]
  )

  return (
    <div
      data-schema-type={schemaType}
      data-schema-title={schemaKey}
      data-schema-id={schemaKey}
      className={rootNode ? 'rsc-controls-root' : 'rsc-controls-child'}
      {...(rootNode && {
        'data-root-node': rootNode,
      })}
      style={{ display: rootNode || isNodeVisible ? 'block' : 'none' }}
    >
      {!rootNode && (
        <>
          <Row align="middle" gutter={5}>
            {/* NAME COLUMN */}
            <Col {...nameColProps}>
              <div style={{ display: 'flex' }}>
                {/* EXPAND/COLLAPSE BUTTON */}
                <div style={{ flex: '0 0 30px' }}>
                  {isCollection && (
                    <Button
                      type="text"
                      onClick={handleShow}
                      style={{ width: '100%', backgroundColor: '#fff' }}
                      icon={
                        show ? (
                          <CaretDownFilled style={{ color: '#777' }} />
                        ) : (
                          <CaretRightFilled style={{ color: '#777' }} />
                        )
                      }
                    />
                  )}
                </div>

                {/* FIELD NAME */}
                <div style={{ flex: '1 1 auto', position: 'relative' }}>
                  {isFunction(onChangeKey) && (
                    <>
                      <Icon types={schemaType} style={{ position: 'absolute', top: '9px', left: '9px', zIndex: '3' }} />
                      <Input
                        style={{ padding: '4px 11px 4px 30px' }}
                        defaultValue={schemaKey}
                        disabled={rootNode || disabledInput}
                        onBlur={e => {
                          if (validateFieldName(e.target.value)) {
                            onChangeFieldName(e)
                            setValid(true)
                          } else {
                            setValid(false)
                          }
                        }}
                        autoFocus
                        {...(valid
                          ? {}
                          : {
                              status: 'error',
                              prefix: (
                                <Tooltip
                                  title={
                                    <ul>
                                      <li>Must not start with a number</li>
                                      <li>Must not contain dots(.) or other special characters</li>
                                    </ul>
                                  }
                                >
                                  <ExclamationCircleOutlined />
                                </Tooltip>
                              ),
                            })}
                      />
                    </>
                  )}
                </div>
              </div>
            </Col>
            {/* TYPE COLUMN */}
            <Col {...typeColProps}>
              <Select
                style={{
                  width: '100%',
                }}
                className="rsc-controls-control-select-box"
                value={getTypeOptions}
                disabled={rootNode}
                onChange={onChangeFieldType}
                filterOption={false}
                listHeight={500}
                popupMatchSelectWidth={false}
              >
                <Select.OptGroup key="primitive" label="Primitive">
                  {schemaTypes.slice(3).map(({ value, label, description }) => {
                    return (
                      <Select.Option value={value} key={value}>
                        <div>
                          <Title level={5} style={{ fontSize: '15px' }}>
                            <Icon types={value} /> {label}
                          </Title>
                          <Text style={{ paddingLeft: '10px' }}>{description}</Text>
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select.OptGroup>
                <Select.OptGroup key="complex" label="Complex">
                  {schemaTypes.slice(0, 3).map(({ value, label, description }) => {
                    return (
                      <Select.Option value={value} key={value}>
                        <div>
                          <Title level={5} style={{ fontSize: '15px' }}>
                            <Icon types={value} /> {label}
                          </Title>
                          <Text style={{ paddingLeft: '10px' }}>{description}</Text>
                        </div>
                      </Select.Option>
                    )
                  })}
                </Select.OptGroup>
              </Select>
            </Col>
            {/* TODO: Uniforms autoform vaidation */}
            {/*<Tooltip title='Field Settings'>
                <Col xs={2} xl={1}>
                  <Button
                    type="text"
                    style={{ width: '100%' }}
                    onClick={!getTypeOptions ? doNothing : openModal}
                    icon={
                      <SettingOutlined style={!getTypeOptions ? { 
                          color: 'rgba(0, 0, 0, 0.25)',
                          cursor: 'not-allowed',
                        } : {
                          color: '#3182ce'
                        }} 
                      />
                    }
                  />
                </Col>
              </Tooltip>*/}
            <Col {...actionColProps}>
              {!isParentArray() && !rootNode && (
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    onClick={isParentArray() || rootNode ? doNothing : onDelete}
                    disabled={isParentArray() || rootNode}
                    className="property--delete-btn"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              )}
            </Col>
          </Row>

          {/*<SchemaOptions
            showModal={showModal}
            onClose={closeModal}
            schema={schema}
            schemaKey={schemaKey}
            onChange={onChange}
              />*/}
        </>
      )}
      {isCollection && show && (
        <div className="rsc-controls-control-box">
          {isObject && (
            <>
              <CommonSubObject
                schema={schema}
                onDelete={key => onChange(deleteSchemaProperty(key)(schema))}
                onChange={(key, newSchema) => onChange(setSchemaProperty(key)(newSchema, schema))}
                onChangeKey={(oldKey, newKey) => {
                  onChange(renameSchemaProperty(oldKey, newKey, schema))
                }}
              />
              {/* ADD NEW BUTTON */}
              <AddButtonRow>
                <NewPropertyButton
                  onAdd={onAdd}
                  type={rootNode ? 'primary' : undefined}
                  label={rootNode ? '+ Add Field' : '+ Add Object Field'}
                />
              </AddButtonRow>
            </>
          )}
          {isColl && show && (
            <>
              <CommonSubCollection
                schema={schema}
                onDelete={key => onChange(deleteSchemaProperty(key)(schema))}
                onChange={(key, newSchema) => onChange(setSchemaProperty(key)(newSchema, schema))}
                onChangeKey={(oldKey, newKey) => {
                  onChange(renameSchemaProperty(oldKey, newKey, schema))
                }}
              />
              <AddButtonRow>
                <NewPropertyButton onAdd={onAdd} label="+ Add Collection Field" />
              </AddButtonRow>
            </>
          )}
          {isArray && (
            <CommonSubArray
              schema={getSchemaItems(schema)}
              onChange={oldSchema => onChange(setSchemaItems(oldSchema, schema))}
            />
          )}
        </div>
      )}
    </div>
  )
}

function AddButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rsc-controls-add-button">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 30px' }}></div>
        <div style={{ flex: '1 1 auto' }}>{children}</div>
      </div>
    </div>
  )
}

export default CommonControls
