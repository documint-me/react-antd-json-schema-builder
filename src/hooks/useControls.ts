import entries from 'lodash/entries'
import React, { useState } from 'react'
import { useSchemaContext } from '../context/schema-context'
import { schemaTypes } from '../helpers/constants'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields
} from '../helpers/schema'
import { Schema } from '../helpers/types'
import useDecodeSchema from './useDecodeSchema'

interface UseControlProps {
  schema: Schema
  schemaKey: string
  onChange?: any
  onChangeKey?: any
  rootNode?: boolean
}

const useControls = ({
  schema,
  schemaKey,
  onChange,
  onChangeKey,
  rootNode
}: UseControlProps) => {
  const {
    handlePushToChanges,
    handleChangesIdKey,
    handleGetIsInChanges
  } = useSchemaContext()
  const autoExpand = handleGetIsInChanges(schemaKey)
  const [show, setShow] = useState(rootNode || autoExpand)
  const [showModal, setShowModal] = useState(false)
  const { schemaType, schemaTitle, schemaProperties } = useDecodeSchema(schema)
  const schemaEntries = entries(schemaProperties)

  const handleShow = () => setShow(state => !state)

  const getTypeOptions = (findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown) as string

  const openModal = () => setShowModal(true)

  const closeModal = () => setShowModal(false)

  const onChangeFieldName = (event: React.FocusEvent<HTMLInputElement>) => {
    return onChangeKey
      ? () => {
          handleChangesIdKey(schemaKey, event.target.value)
          onChangeKey(event.target.value)
        }
      : undefined
  }

  const onChangeFieldType = (option: string) => {
    const collectionTypes = ['object', 'array']
    if (collectionTypes.includes(option)) {
      handlePushToChanges(schemaKey)
    }
    onChange(setSchemaTypeAndRemoveWrongFields(option, schema))
  }

  return {
    schemaType,
    schemaTitle,
    schemaEntries,
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType
  }
}

export default useControls
