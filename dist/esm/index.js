import React, { useState, useRef, useEffect, useCallback, useContext, useMemo } from 'react';
import { Button, Tooltip, Typography, Row, Col, Input, Select, Space } from 'antd';
import { FontSizeOutlined, GroupOutlined, AppstoreOutlined, ClockCircleOutlined, CalendarOutlined, DollarOutlined, PercentageOutlined, NumberOutlined, CheckOutlined, BarsOutlined, CaretDownFilled, CaretRightFilled, DeleteOutlined, SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import noop from 'lodash/noop';
import assign from 'lodash/fp/assign';
import entries from 'lodash/fp/entries';
import find from 'lodash/fp/find';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import 'lodash/fp/isEmpty';
import 'lodash/fp/keys';
import map from 'lodash/fp/map';
import 'lodash/fp/noop';
import pick from 'lodash/fp/pick';
import 'lodash/fp/pickBy';
import 'lodash/fp/includes';
import reduce from 'lodash/fp/reduce';
import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import { isFunction } from 'lodash';
import entries$1 from 'lodash/entries';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var jsonSchemaTraverse = {exports: {}};

var traverse = jsonSchemaTraverse.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

var uuidv4 = function () {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
    });
};
var getAllKeys = function (obj, startKeys) {
    if (startKeys === void 0) { startKeys = []; }
    var result = startKeys;
    Object.keys(obj).forEach(function (key) {
        // @ts-ignore
        var val = obj[key];
        result.push(key);
        if (typeof val === 'object') {
            getAllKeys(val, result);
        }
    });
    return result;
};
var unique = function (prefix, obj) {
    if (obj === void 0) { obj = {}; }
    var usedIDs = getAllKeys(obj)
        .map(function (key) {
        return parseInt(key.split(prefix)[1]);
    })
        .filter(function (val) {
        return Boolean(val);
    });
    return usedIDs.length ? Math.max.apply(Math, usedIDs) + 1 : 0;
};
var idCounter = {};
var uniqueId = function (prefix, obj) {
    if (obj === void 0) { obj = {}; }
    if (!idCounter[prefix]) {
        idCounter[prefix] = unique(prefix, obj);
    }
    var id = ++idCounter[prefix];
    return prefix + id;
};

var addIdsToSchema = function (schema) {
    jsonSchemaTraverse.exports(schema, function (schema, _parent, _root, _parentJSONParent, _parentKeyword, parentSchema, keyIndex) {
        if (!keyIndex)
            return;
        parentSchema['properties'][keyIndex] = __assign({ uuid: schema.uuid ? schema.uuid : uuidv4(), id: keyIndex }, schema);
    });
    return schema;
};

var defaultSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    title: 'root',
    properties: {}
};

var useUnsavedChanges = function (data) {
    var _a = useState(false), isDirty = _a[0], setDirty = _a[1];
    var isFirstRender = useRef(true);
    var handleSetDirty = function () { return setDirty(true); };
    var handleSetPristine = function () { return setDirty(false); };
    useEffect(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handleSetDirty();
    }, [data]);
    return { isDirty: isDirty, handleSetDirty: handleSetDirty, handleSetPristine: handleSetPristine };
};

var SchemaContext = React.createContext({
    changes: [],
    handlePushToChanges: function (_id) { },
    handleGetIsInChanges: function (_id) { return false; },
    handleChangesIdKey: function (_old, _new) { },
    expandCollapseAll: '',
    setExpandCollapseAll: function (_id) { },
    search: '',
    setSearch: function (_query) { },
});
var SchemaProvider = function (_a) {
    var children = _a.children;
    var _b = useState(''), expandCollapseAll = _b[0], setExpandCollapseAll = _b[1];
    var _c = useState(''), search = _c[0], setSearch = _c[1];
    var _d = useState([]), changes = _d[0], setChanges = _d[1];
    var handlePushToChanges = useCallback(function (id) {
        setChanges(function (value) { return __spreadArray(__spreadArray([], value, true), [id], false); });
    }, []);
    var handleChangesIdKey = useCallback(function (oldkey, newKey) {
        var isExist = changes.includes(oldkey);
        if (!isExist)
            return;
        setChanges(function (value) {
            var removeExisting = value.filter(function (item) { return item !== oldkey; });
            return __spreadArray(__spreadArray([], removeExisting, true), [newKey], false);
        });
    }, [changes]);
    var handleGetIsInChanges = useCallback(function (id) {
        var isInChanges = changes.includes(id);
        if (!isInChanges)
            return false;
        setChanges(function (value) { return value.filter(function (item) { return item !== id; }); });
        return true;
    }, [changes]);
    return (React.createElement(SchemaContext.Provider, { value: {
            changes: changes,
            handlePushToChanges: handlePushToChanges,
            handleChangesIdKey: handleChangesIdKey,
            handleGetIsInChanges: handleGetIsInChanges,
            expandCollapseAll: expandCollapseAll,
            setExpandCollapseAll: setExpandCollapseAll,
            search: search,
            setSearch: setSearch,
        } }, children));
};
var useSchemaContext = function () { return useContext(SchemaContext); };

var ROOT_KEY = '__root__';
var schemaTypes = [
    {
        value: 'object',
        label: 'Object',
        description: ' Key-value paired elements.',
    },
    {
        value: 'collection',
        label: 'Collection',
        description: 'Array of objects.',
    },
    {
        value: 'array',
        label: 'List',
        description: 'Array of items of the same primitive type.',
    },
    {
        value: 'string',
        label: 'String',
        description: 'Simple text, multi-line text, markdown, etc.',
    },
    {
        value: 'number',
        label: 'Number',
        description: 'An integer, float, quantity, currency, percent etc.',
    },
    {
        value: 'boolean',
        label: 'Boolean',
        description: 'Toggle for true/false values',
    },
    // {
    //   value: 'currency',
    //   label: 'Currency',
    //   description: 'Number with currency formatting.',
    // },
    // {
    //   value: 'percent',
    //   label: 'Percent',
    //   description: 'Number with percent formatting',
    // },
    {
        value: 'date',
        label: 'Date',
        description: 'Date for an event.',
    },
];
var formatOptions = [
    {
        value: 'date-time',
        label: 'Date/Time',
    },
    {
        value: 'email',
        label: 'Email',
    },
    {
        value: 'hostname',
        label: 'Hostname',
    },
    {
        value: 'ipv4',
        label: 'IPv4',
    },
    {
        value: 'ipv6',
        label: 'IPv6',
    },
    {
        value: 'uri',
        label: 'URI',
    },
];
var commonValidProperties = [
    'id',
    'uuid',
    'description',
    'type',
    'title',
    'items',
    'disabled',
];
var stringValidSchemaProperties = __spreadArray(__spreadArray([], commonValidProperties, true), [
    'enum',
    'format',
    'maxLength',
    'minLength',
    'pattern',
], false);
var numberValidSchemaProperties = __spreadArray(__spreadArray([], commonValidProperties, true), [
    'maximum',
    'minimum',
    'step',
], false);
var boolValidSchemaProperties = __spreadArray([], commonValidProperties, true);
var arrayValidSchemaProperties = __spreadArray(__spreadArray([], commonValidProperties, true), [
    'maxItems',
    'minItems',
    'uniqueItems',
    'items',
], false);
var objectValidSchemaProperties = __spreadArray(__spreadArray([], commonValidProperties, true), [
    'properties',
], false);
var currencyValidSchemaProperties = __spreadArray([], numberValidSchemaProperties, true);
var percentValidSchemaProperties = __spreadArray([], numberValidSchemaProperties, true);
var dateValidSchemaProperties = __spreadArray([], commonValidProperties, true);
var commonSchemaOptions = [
    { value: 'description', label: 'Description', type: 'text' },
    { value: 'disabled', label: 'Disabled', type: 'boolean' },
];
__spreadArray(__spreadArray([], commonSchemaOptions, true), [
    { value: 'minLength', label: 'Min Length', type: 'number' },
    { value: 'maxLength', label: 'Max Length', type: 'number' },
    { value: 'enum', label: 'Options', type: 'multi' },
    { value: 'pattern', label: 'Pattern', type: 'text' },
    {
        value: 'format',
        label: 'Format',
        type: 'select',
        optionList: formatOptions,
    },
], false);
var numberSchemaOptions = __spreadArray(__spreadArray([], commonSchemaOptions, true), [
    { value: 'minimum', label: 'Min Number', type: 'number' },
    { value: 'maximum', label: 'Max Number', type: 'number' },
    { value: 'step', label: 'Step', type: 'number' },
], false);
__spreadArray([], commonSchemaOptions, true);
__spreadArray([], commonSchemaOptions, true);
__spreadArray(__spreadArray([], commonSchemaOptions, true), [
    { value: 'minItems', label: 'Min Items', type: 'number' },
    { value: 'maxItems', label: 'Max Items', type: 'number' },
    { value: 'uniqueItems', label: 'Unique Items', type: 'boolean' },
], false);
__spreadArray([], numberSchemaOptions, true);
__spreadArray([], numberSchemaOptions, true);
__spreadArray([], commonSchemaOptions, true);
var typeToValidFields = {
    string: stringValidSchemaProperties,
    number: numberValidSchemaProperties,
    boolean: boolValidSchemaProperties,
    object: objectValidSchemaProperties,
    collection: arrayValidSchemaProperties,
    array: arrayValidSchemaProperties,
    percent: percentValidSchemaProperties,
    currency: currencyValidSchemaProperties,
    date: dateValidSchemaProperties,
};

var getSchemaField = get;
var getSchemaFields = pick;
var getSchemaType = getSchemaField('type');
var getSchemaTitle = getSchemaField('title');
var getSchemaProperties = getSchemaField('properties');
var getSchemaItems = getSchemaField('items');
var setSchemaField = set;
var setSchemaType = setSchemaField('type');
setSchemaField('title');
setSchemaField('id');
var setSchemaProperties = setSchemaField('properties');
var setSchemaProperty = function (key) { return setSchemaField(['properties', key]); };
var setSchemaItems = function (oldSchema, schema) {
    return setSchemaField('items')(__assign({ uuid: uuidv4(), type: 'string' }, oldSchema), schema);
};
var setSchemaTempItems = function (schema) {
    var schemaItems = getSchemaItems(schema) || {};
    return setSchemaField('items')(__assign({ uuid: uuidv4(), type: 'string' }, schemaItems), schema);
};
var deleteSchemaField = unset;
var deleteSchemaProperty = function (key) { return deleteSchemaField(['properties', key]); };
var addSchemaProperty = function (schema) {
    return setSchemaProperty(uniqueId('field_', schema))({ uuid: uuidv4(), type: 'string' }, schema);
};
var renameSchemaField = function (oldKey, newKey) {
    return flow([
        entries,
        map(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (_b = {},
                _b[k === oldKey ? newKey : k] = __assign(__assign({}, v), { id: k === oldKey ? newKey : v.id }),
                _b);
        }),
        reduce(assign, {}),
    ]);
};
var renameSchemaProperty = function (oldKey, newKey, schema) {
    return flow([getSchemaProperties, renameSchemaField(oldKey, newKey), function (p) { return setSchemaProperties(p, schema); }])(schema);
};
var isSchemaObject = function (schema) {
    return getSchemaType(schema) === 'object' || getSchemaType(schema) === 'collection';
};
var findOption = function (value) { return find(['value', value]); };
var getValidFields = function (type) { return get(type, typeToValidFields); };
var removeWrongFields = function (schema) {
    var type = getSchemaType(schema);
    var fields = getValidFields(type);
    return getSchemaFields(fields, schema);
};
var setSchemaTypeAndRemoveWrongFields = flow([setSchemaType, removeWrongFields]);
var setSchemaTypeAndSetItemsAndRemoveWrongFields = flow([setSchemaType, setSchemaTempItems, removeWrongFields]);
map(function (s) { return ({ label: s, value: s }); });

var useDecodeSchema = function (schema) {
    var schemaType = useMemo(function () { return getSchemaType(schema); }, [schema]);
    var schemaTitle = useMemo(function () { return getSchemaTitle(schema); }, [schema]);
    var schemaProperties = useMemo(function () { return getSchemaProperties(schema); }, [schema]);
    return {
        schemaType: schemaType,
        schemaTitle: schemaTitle,
        schemaProperties: schemaProperties,
    };
};

var collectionTypes = ['object', 'array', 'collection'];
var useControls = function (_a) {
    var schema = _a.schema, _b = _a.schemaKey, schemaKey = _b === void 0 ? '' : _b, onChange = _a.onChange, onChangeKey = _a.onChangeKey, rootNode = _a.rootNode;
    var _c = useSchemaContext(), expandCollapseAll = _c.expandCollapseAll, setExpandCollapseAll = _c.setExpandCollapseAll, handlePushToChanges = _c.handlePushToChanges, handleChangesIdKey = _c.handleChangesIdKey, handleGetIsInChanges = _c.handleGetIsInChanges;
    var autoExpand = handleGetIsInChanges(schemaKey);
    var _d = useState(rootNode || autoExpand), show = _d[0], setShow = _d[1];
    var _e = useState(false), showModal = _e[0], setShowModal = _e[1];
    var schemaType = useDecodeSchema(schema).schemaType;
    var handleShow = useCallback(function () { return setShow(function (state) { return !state; }); }, []);
    var getTypeOptions = findOption(getSchemaType(schema))(schemaTypes);
    var openModal = useCallback(function () { return setShowModal(true); }, []);
    var closeModal = useCallback(function () { return setShowModal(false); }, []);
    var onChangeFieldName = useCallback(function (event) {
        if (schemaKey !== event.target.value) {
            handlePushToChanges(schemaKey);
            handleChangesIdKey(schemaKey, event.target.value);
            onChangeKey(event.target.value);
        }
    }, [handlePushToChanges, handleChangesIdKey, onChangeKey, schemaKey]);
    var onChangeFieldType = useCallback(function (option) {
        collectionTypes.includes(option) && handlePushToChanges(schemaKey);
        option === 'array' && onChange(setSchemaTypeAndSetItemsAndRemoveWrongFields(option, schema));
        option !== 'array' && onChange(setSchemaTypeAndRemoveWrongFields(option, schema));
    }, [handlePushToChanges, onChange, schema, schemaKey]);
    var isParentArray = function () { return schemaKey === 'items'; };
    useEffect(function () {
        if (expandCollapseAll.startsWith('expand'))
            setShow(true);
        else if (!rootNode && expandCollapseAll.startsWith('collapse'))
            setShow(false);
        return setExpandCollapseAll('');
    }, [expandCollapseAll]);
    return {
        schemaType: schemaType,
        getTypeOptions: getTypeOptions,
        show: show,
        showModal: showModal,
        openModal: openModal,
        closeModal: closeModal,
        handleShow: handleShow,
        onChangeFieldName: onChangeFieldName,
        onChangeFieldType: onChangeFieldType,
        isParentArray: isParentArray,
    };
};

var CommonSubArray = function (_a) {
    var schema = _a.schema, onChange = _a.onChange;
    return (React.createElement(SchemaCreator, { schema: schema, schemaKey: "items", disabledInput: true, onChange: onChange }));
};

var CommonSubObject = function (_a) {
    var schema = _a.schema, onDelete = _a.onDelete, onChangeKey = _a.onChangeKey, onChange = _a.onChange;
    var schemaProperties = useDecodeSchema(schema).schemaProperties;
    var schemaEntries = useMemo(function () { return entries$1(schemaProperties); }, [schemaProperties]);
    return (React.createElement(React.Fragment, null, schemaEntries.map(function (_a) {
        var key = _a[0], properties = _a[1];
        return (React.createElement(SchemaCreator, { key: key, schema: properties, schemaKey: key, onDelete: onDelete, onChangeKey: function (newKey) { return onChangeKey(key, newKey); }, onChange: function (newSchema) { return onChange(key, newSchema); } }));
    })));
};

var CommonSubCollection = function (_a) {
    var schema = _a.schema, onDelete = _a.onDelete, onChangeKey = _a.onChangeKey, onChange = _a.onChange;
    var schemaProperties = useDecodeSchema(schema).schemaProperties;
    var schemaEntries = useMemo(function () { return entries$1(schemaProperties); }, [schemaProperties]);
    return (React.createElement(React.Fragment, null, schemaEntries.map(function (_a) {
        var key = _a[0], properties = _a[1];
        return (React.createElement(SchemaCreator, { key: key, schema: properties, schemaKey: key, onDelete: onDelete, onChangeKey: function (newKey) { return onChangeKey(key, newKey); }, onChange: function (newSchema) { return onChange(key, newSchema); } }));
    })));
};

var Icon = function (_a) {
    var types = _a.types, props = __rest(_a, ["types"]);
    switch (types) {
        case 'array':
            return React.createElement(BarsOutlined, __assign({}, props));
        case 'boolean':
            return React.createElement(CheckOutlined, __assign({}, props));
        case 'number':
            return React.createElement(NumberOutlined, __assign({}, props));
        case 'percent':
            return React.createElement(PercentageOutlined, __assign({}, props));
        case 'currency':
            return React.createElement(DollarOutlined, __assign({}, props));
        case 'date':
            return React.createElement(CalendarOutlined, __assign({}, props));
        case 'duration':
            return React.createElement(ClockCircleOutlined, __assign({}, props));
        case 'object':
            return React.createElement(AppstoreOutlined, __assign({}, props));
        case 'collection':
            return React.createElement(GroupOutlined, __assign({}, props));
        default:
            return React.createElement(FontSizeOutlined, __assign({}, props));
    }
};

var NewPropertyButton = function (props) {
    var onAdd = props.onAdd, _a = props.label, label = _a === void 0 ? '+ Add Field' : _a, _b = props.type, type = _b === void 0 ? 'link' : _b, rest = __rest(props, ["onAdd", "label", "type"]);
    var search = useSchemaContext().search;
    var disabled = useMemo(function () { return !isFunction(onAdd) || !!search; }, [onAdd, search]);
    var button = (React.createElement(Button, __assign({}, rest, { type: type, disabled: disabled, onClick: onAdd, className: "new-property-btn", style: {
            borderRadius: '6px',
        } }), label));
    return disabled ? (React.createElement(Tooltip, { title: "Clear Search", placement: "bottom" }, button)) : (button);
};

var Title = Typography.Title, Text = Typography.Text;
var doNothing = function () { };
function findMatchingChildNode(schema, query) {
    if (!query)
        return true;
    var foundNodes = [];
    jsonSchemaTraverse.exports(schema, {}, function (_schema, _parent, _root, _parentJSONParent, _parentKeyword, _parentSchema, keyIndex) {
        if (!keyIndex)
            return;
        String(keyIndex).includes(query) && foundNodes.push(String(keyIndex));
    });
    return foundNodes.length > 0;
}
var CommonControls = function (_a) {
    var schema = _a.schema, schemaKey = _a.schemaKey, rootNode = _a.rootNode, controlType = _a.controlType, disabledInput = _a.disabledInput, onAdd = _a.onAdd, onDelete = _a.onDelete, onChange = _a.onChange, onChangeKey = _a.onChangeKey;
    var _b = useControls({
        schema: schema,
        schemaKey: schemaKey,
        rootNode: rootNode,
        onChange: onChange,
        onChangeKey: onChangeKey,
    }), getTypeOptions = _b.getTypeOptions, show = _b.show, schemaType = _b.schemaType, handleShow = _b.handleShow, onChangeFieldName = _b.onChangeFieldName, onChangeFieldType = _b.onChangeFieldType, isParentArray = _b.isParentArray;
    var search = useSchemaContext().search;
    var isCollection = controlType !== 'primitive';
    var isColl = controlType === 'collection';
    var isObject = controlType === 'object';
    var isArray = controlType === 'array';
    var nameColProps = { xs: 16, xl: 16 };
    var typeColProps = { xs: 6, xl: 6 };
    var actionColProps = { xs: 2, xl: 2 };
    var isNodeVisible = useMemo(function () {
        return !search ||
            !schema.id ||
            Boolean(schema.id && schema.id.includes(search)) ||
            findMatchingChildNode(schema, search);
    }, [schema, search]);
    return (React.createElement("div", __assign({ "data-schema-type": schemaType, "data-schema-title": schemaKey, "data-schema-id": schemaKey, className: rootNode ? 'rsc-controls-root' : 'rsc-controls-child' }, (rootNode && {
        'data-root-node': rootNode,
    }), { style: { display: rootNode || isNodeVisible ? 'block' : 'none' } }),
        !rootNode && (React.createElement(React.Fragment, null,
            React.createElement(Row, { align: "middle", gutter: 5 },
                React.createElement(Col, __assign({}, nameColProps),
                    React.createElement("div", { style: { display: 'flex' } },
                        React.createElement("div", { style: { flex: '0 0 30px' } }, isCollection && (React.createElement(Button, { type: "text", onClick: handleShow, style: { width: '100%', backgroundColor: '#fff' }, icon: show ? (React.createElement(CaretDownFilled, { style: { color: '#777' } })) : (React.createElement(CaretRightFilled, { style: { color: '#777' } })) }))),
                        React.createElement("div", { style: { flex: '1 1 auto', position: 'relative' } }, isFunction(onChangeKey) && (React.createElement(React.Fragment, null,
                            React.createElement(Icon, { types: schemaType, style: { position: 'absolute', top: '9px', left: '9px', zIndex: '1' } }),
                            React.createElement(Input, { style: { padding: '4px 11px 4px 30px' }, defaultValue: schemaKey, disabled: rootNode || disabledInput, onBlur: onChangeFieldName, autoFocus: true })))))),
                React.createElement(Col, __assign({}, typeColProps),
                    React.createElement(Select, { style: {
                            width: '100%',
                        }, className: "rsc-controls-control-select-box", value: getTypeOptions, disabled: rootNode, onChange: onChangeFieldType, filterOption: false, listHeight: 500, dropdownMatchSelectWidth: false },
                        React.createElement(Select.OptGroup, { key: "primitive", label: "Primitive" }, schemaTypes.slice(3).map(function (_a) {
                            var value = _a.value, label = _a.label, description = _a.description;
                            return (React.createElement(Select.Option, { value: value, key: value },
                                React.createElement("div", null,
                                    React.createElement(Title, { level: 5, style: { fontSize: '15px' } },
                                        React.createElement(Icon, { types: value }),
                                        " ",
                                        label),
                                    React.createElement(Text, { style: { paddingLeft: '10px' } }, description))));
                        })),
                        React.createElement(Select.OptGroup, { key: "complex", label: "Complex" }, schemaTypes.slice(0, 3).map(function (_a) {
                            var value = _a.value, label = _a.label, description = _a.description;
                            return (React.createElement(Select.Option, { value: value, key: value },
                                React.createElement("div", null,
                                    React.createElement(Title, { level: 5, style: { fontSize: '15px' } },
                                        React.createElement(Icon, { types: value }),
                                        " ",
                                        label),
                                    React.createElement(Text, { style: { paddingLeft: '10px' } }, description))));
                        })))),
                React.createElement(Col, __assign({}, actionColProps), !isParentArray() && !rootNode && (React.createElement(Tooltip, { title: "Delete" },
                    React.createElement(Button, { type: "ghost", onClick: isParentArray() || rootNode ? doNothing : onDelete, disabled: isParentArray() || rootNode, className: "property--delete-btn", icon: React.createElement(DeleteOutlined, null) }))))))),
        isCollection && show && (React.createElement("div", { className: "rsc-controls-control-box" },
            isObject && (React.createElement(React.Fragment, null,
                React.createElement(CommonSubObject, { schema: schema, onDelete: function (key) { return onChange(deleteSchemaProperty(key)(schema)); }, onChange: function (key, newSchema) { return onChange(setSchemaProperty(key)(newSchema, schema)); }, onChangeKey: function (oldKey, newKey) {
                        onChange(renameSchemaProperty(oldKey, newKey, schema));
                    } }),
                React.createElement(AddButtonRow, null,
                    React.createElement(NewPropertyButton, { onAdd: onAdd, type: rootNode ? 'primary' : undefined, label: rootNode ? '+ Add Field' : '+ Add Object Field' })))),
            isColl && show && (React.createElement(React.Fragment, null,
                React.createElement(CommonSubCollection, { schema: schema, onDelete: function (key) { return onChange(deleteSchemaProperty(key)(schema)); }, onChange: function (key, newSchema) { return onChange(setSchemaProperty(key)(newSchema, schema)); }, onChangeKey: function (oldKey, newKey) {
                        onChange(renameSchemaProperty(oldKey, newKey, schema));
                    } }),
                React.createElement(AddButtonRow, null,
                    React.createElement(NewPropertyButton, { onAdd: onAdd, label: "+ Add Collection Field" })))),
            isArray && (React.createElement(CommonSubArray, { schema: getSchemaItems(schema), onChange: function (oldSchema) { return onChange(setSchemaItems(oldSchema, schema)); } }))))));
};
function AddButtonRow(_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "rsc-controls-add-button" },
        React.createElement("div", { style: { display: 'flex' } },
            React.createElement("div", { style: { flex: '0 0 30px' } }),
            React.createElement("div", { style: { flex: '1 1 auto' } }, children))));
}

var CollectionControls = function (_a) {
    var props = __rest(_a, []);
    return React.createElement(CommonControls, __assign({}, props));
};

var ArrayControls = function (_a) {
    var props = __rest(_a, []);
    return React.createElement(CommonControls, __assign({}, props));
};

var ObjectControls = function (_a) {
    var props = __rest(_a, []);
    return React.createElement(CommonControls, __assign({}, props));
};

var PrimitiveControls = function (_a) {
    var props = __rest(_a, []);
    return React.createElement(CommonControls, __assign({}, props));
};

var typeToControl = {
    object: function (props) { return React.createElement(ObjectControls, __assign({ controlType: "object" }, props)); },
    collection: function (props) { return (React.createElement(CollectionControls, __assign({ controlType: "collection" }, props))); },
    array: function (props) { return React.createElement(ArrayControls, __assign({ controlType: "array" }, props)); },
    string: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    number: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    boolean: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    percent: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    currency: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    date: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
    default: function (props) { return React.createElement(PrimitiveControls, __assign({ controlType: "primitive" }, props)); },
};
var SchemaCreator = function (_a) {
    var schema = _a.schema, _b = _a.schemaKey, schemaKey = _b === void 0 ? ROOT_KEY : _b, disabledInput = _a.disabledInput, _c = _a.onChange, onChange = _c === void 0 ? noop : _c, _d = _a.onDelete, onDelete = _d === void 0 ? noop : _d, _e = _a.onChangeKey, onChangeKey = _e === void 0 ? noop : _e;
    var schemaType = useDecodeSchema(schema).schemaType;
    var onAdd = useMemo(function () {
        return isSchemaObject(schema)
            ? function () { return onChange(addSchemaProperty(schema)); }
            : undefined;
    }, [schema, onChange]);
    return typeToControl[schemaType || 'default']({
        schema: schema,
        schemaKey: schemaKey,
        rootNode: schemaKey === ROOT_KEY,
        disabledInput: disabledInput,
        onDelete: function () { return onDelete(schemaKey); },
        onAdd: onAdd,
        onChangeKey: onChangeKey,
        onChange: onChange,
    });
};

var SchemaBuilder$1 = function (_a) {
    var _b;
    var data = _a.data, onChange = _a.onChange, dispatch = _a.dispatch, updateSchema = _a.updateSchema, undoRedo = _a.undoRedo;
    var _c = useSchemaContext(), setExpandCollapseAll = _c.setExpandCollapseAll, setSearch = _c.setSearch;
    var css = "\n  .rsc-controls-root {}\n\n  .rsc-controls-root > div.rsc-controls-control-box {\n    padding: 16px;\n    margin: 0;\n    border: none;\n    background-color: none;\n  }\n\n  .rsc-controls-control-box {\n    margin: 6px 0;\n    border-radius: 10px;\n    padding: 0 0 0 16px;\n  }\n\n  .rsc-controls-child {\n    margin: 6px 0;\n  }\n";
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, css),
        React.createElement(Space, { style: { justifyContent: 'space-between', width: '100%' } },
            React.createElement(Space, { size: 0, className: "schema-builder-search", style: { position: 'relative' } },
                React.createElement(SearchOutlined, { style: { position: 'absolute', top: '9px', left: '10px', zIndex: '2' } }),
                React.createElement(Input, { style: { padding: '4px 11px 4px 30px' }, placeholder: "Search", allowClear: true, onChange: function (e) { return setSearch(e.target.value); } })),
            React.createElement(Space, null,
                undoRedo,
                React.createElement(Space, { className: "collapse-expand" },
                    React.createElement(Tooltip, { title: "Expand All" },
                        React.createElement(Button, { title: "Exapand All", icon: React.createElement(DownOutlined, null), onClick: function () { return setExpandCollapseAll("expand-".concat(crypto.randomUUID())); } })),
                    React.createElement(Tooltip, { title: "Collapse All" },
                        React.createElement(Button, { title: "Collapse All", icon: React.createElement(UpOutlined, null), onClick: function () { return setExpandCollapseAll("collapse-".concat(crypto.randomUUID())); } }))))),
        React.createElement(Row, { align: "middle", style: { padding: '16px', borderBottom: 'solid 1px #D3DDF2' } },
            React.createElement(Col, { xs: { span: 15, offset: 1 } }, "Name"),
            React.createElement(Col, { xs: 8 }, "Type")),
        React.createElement(SchemaCreator, { schema: ((_b = data === null || data === void 0 ? void 0 : data.present) === null || _b === void 0 ? void 0 : _b.schema) || data, onChange: function (schema) {
                onChange(schema);
                dispatch && updateSchema && dispatch(updateSchema(schema));
            } })));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "";
styleInject(css_248z);

var SchemaBuilder = function (_a) {
    var data = _a.data, onChange = _a.onChange, undoRedo = _a.undoRedo, dispatch = _a.dispatch, updateSchema = _a.updateSchema;
    return (React.createElement(SchemaProvider, null,
        React.createElement(SchemaBuilder$1, { data: data, undoRedo: undoRedo, onChange: onChange, dispatch: dispatch, updateSchema: updateSchema })));
};

export { SchemaBuilder as JSONSchemaBuilder, addIdsToSchema, defaultSchema, useUnsavedChanges };
//# sourceMappingURL=index.js.map
