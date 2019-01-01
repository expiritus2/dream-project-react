import { isEmpty } from "lodash-es";

export const getQueryParam = (params, paramName, defaultValue = null) =>
  params.get(paramName) ? JSON.parse(params.get(paramName)) : defaultValue;

export const setQueryParam = (params, paramName, param, queryParam = null) => {
  if (isEmpty(queryParam) && isEmpty(param)) return;

  if (queryParam) {
    params.set(
      paramName,
      typeof param === "string" ? queryParam : JSON.stringify(queryParam),
    );
  } else if (param) {
    params.set(
      paramName,
      typeof param === "string" ? param : JSON.stringify(param),
    );
  }
};

const addIdToString = str => {
  if (typeof str !== "string") return str;
  return str[str.length - 1] === "s" ? `${str.slice(0, -1)}Ids` : `${str}Id`;
};

const prepareModel = (data, included = [], originalData) => {
  const interDic = {
    id: data.id,
    type: data.type,
    ...data.attributes,
    ...data.meta,
  };

  if (data.relationships) {
    Object.keys(data.relationships).forEach(key => {
      const keyString = addIdToString(key);
      const relationshipData = data.relationships[key].data;

      if (relationshipData) {
        // if relationships have a data field -> assume id in data field
        if (Array.isArray(relationshipData)) {
          const relatedIds = [];
          const relatedItems = [];
          relationshipData.forEach(relationship => {
            relatedIds.push(relationship.id);
            if (included.length) {
              const relatedItem = included.find(
                item =>
                  item.id === relationship.id &&
                  item.type === relationship.type,
              );
              if (relatedItem) {
                relatedItems.push(prepareModel(relatedItem, included, data));
              } else {
                const { id, type, attributes } = originalData;
                if (id === relationship.id && type === relationship.type)
                  relatedItems.push({ id, type, ...attributes });
              }
            }
          });
          interDic[keyString] = relatedIds;
          interDic[key] = relatedItems;
        } else {
          interDic[keyString] = relationshipData.id;
          if (included.length) {
            const relatedItem = included.find(
              item =>
                item.id === relationshipData.id &&
                item.type === relationshipData.type,
            );
            if (relatedItem) {
              interDic[key] = prepareModel(relatedItem, included, data);
            } else {
              const { id, type, attributes } = originalData;
              if (id === relationshipData.id && type === relationshipData.type)
                interDic[key] = { id, type, ...attributes };
            }
          }
        }
      }
    });
  }

  return interDic;
};

export const denormalizeJsonApi = response => {
  const prepare = model => prepareModel(model, response.included, model);

  if (Array.isArray(response.data)) return response.data.map(prepare);

  return prepare(response.data);
};
