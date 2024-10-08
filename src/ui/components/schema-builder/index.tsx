import React from 'react'
import { useSchemaContext } from '../../../context/schema-context'
import { Input, Button, Tooltip, Space } from 'antd'
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { JSONSchemaEditor } from '../../../types'
import SchemaCreator from '../schema-creator'
import { Row, Col } from 'antd'

const SchemaBuilder = ({ data, onChange, dispatch, updateSchema, undoRedo }: JSONSchemaEditor) => {
  const { setExpandCollapseAll, setSearch } = useSchemaContext()
  const css = `
  .rsc-controls-root {}

  .rsc-controls-root > div.rsc-controls-control-box {
    padding: 16px;
    margin: 0;
    border: none;
    background-color: none;
  }

  .rsc-controls-control-box {
    margin: 6px 0;
    border-radius: 10px;
    padding: 0 0 0 16px;
  }

  .rsc-controls-child {
    margin: 6px 0;
  }
`

  return (
    <>
      <style>{css}</style>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space size={0} className="schema-builder-search" style={{ position: 'relative' }}>
          <SearchOutlined style={{ position: 'absolute', top: '9px', left: '10px', zIndex: '2' }} />
          <Input
            style={{ padding: '4px 11px 4px 30px' }}
            placeholder="Search"
            allowClear
            onChange={e => setSearch(e.target.value)}
          />
        </Space>
        <Space>
          {undoRedo}
          <Space className="collapse-expand">
            <Tooltip title="Expand All">
              <Button
                title="Exapand All"
                icon={<DownOutlined />}
                onClick={() => setExpandCollapseAll(`expand-${crypto.randomUUID()}`)}
              />
            </Tooltip>
            <Tooltip title="Collapse All">
              <Button
                title="Collapse All"
                icon={<UpOutlined />}
                onClick={() => setExpandCollapseAll(`collapse-${crypto.randomUUID()}`)}
              />
            </Tooltip>
          </Space>
        </Space>
      </Space>
      <Row align="middle" style={{ padding: '16px', borderBottom: 'solid 1px #D3DDF2' }}>
        <Col xs={{ span: 15, offset: 1 }}>Name</Col>
        <Col xs={8}>Type</Col>
      </Row>
      <SchemaCreator
        schema={(data as any)?.present?.schema || data}
        onChange={schema => {
          onChange(schema)
          dispatch && updateSchema && dispatch(updateSchema(schema))
        }}
      />
    </>
  )
}

export default SchemaBuilder
