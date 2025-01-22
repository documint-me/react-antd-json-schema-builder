import React, { useState, useCallback, useEffect } from 'react'
import { useSchemaContext } from '../context/schema-context'
import { schemaTypes } from '../helpers/constants'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields,
  setSchemaTypeAndSetItemsAndRemoveWrongFields,
} from '../helpers/schema'
import { Schema } from '../types'
import useDecodeSchema from './useDecodeSchema'

interface UseControlProps {
  schema: Schema
  schemaKey?: string
  onChange?: any
  onChangeKey?: any
  rootNode?: boolean
}

const collectionTypes = ['object', 'array', 'collection']

const useControls = ({ schema, schemaKey = '', onChange, onChangeKey, rootNode }: UseControlProps) => {
  const { expandCollapseAll, setExpandCollapseAll, handlePushToChanges, handleChangesIdKey, handleGetIsInChanges } =
    useSchemaContext()
  const autoExpand = handleGetIsInChanges(schemaKey)
  const [show, setShow] = useState(rootNode || autoExpand)
  const [valid, setValid] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { schemaType } = useDecodeSchema(schema)

  const handleShow = useCallback(() => setShow(state => !state), [])

  const getTypeOptions = findOption(getSchemaType(schema))(schemaTypes) as unknown as string

  const openModal = useCallback(() => setShowModal(true), [])

  const closeModal = useCallback(() => setShowModal(false), [])

  const onChangeFieldName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (schemaKey !== event.target.value) {
        handlePushToChanges(schemaKey)
        handleChangesIdKey(schemaKey, event.target.value)
        onChangeKey(event.target.value)
      }
    },
    [handlePushToChanges, handleChangesIdKey, onChangeKey, schemaKey]
  )

  const onChangeFieldType = useCallback(
    (option: string) => {
      collectionTypes.includes(option) && handlePushToChanges(schemaKey)
      option === 'array' && onChange(setSchemaTypeAndSetItemsAndRemoveWrongFields(option, schema))
      option !== 'array' && onChange(setSchemaTypeAndRemoveWrongFields(option, schema))
    },
    [handlePushToChanges, onChange, schema, schemaKey]
  )

  const isParentArray = () => schemaKey === 'items'

  useEffect(() => {
    if (expandCollapseAll.startsWith('expand')) setShow(true)
    else if (!rootNode && expandCollapseAll.startsWith('collapse')) setShow(false)
    return setExpandCollapseAll('')
  }, [expandCollapseAll])

  return {
    schemaType,
    getTypeOptions,
    show,
    showModal,
    valid,
    setValid,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
    isParentArray,
  }
}

export default useControls
