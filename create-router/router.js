const xxRender = /(.+(?=[Render]$))/;
const hidexx = /^hide.*/;

function addAttribute(newObject, oldObject) {
  const { attribute = {} } = oldObject;
  // 遍历layout里面的属性
  Object.keys(attribute).forEach(k => {
    // 判断当前属性是否已Render结尾的属性，并且判断当前属性的值时候为false才向其添加此字段
    if (xxRender.test(k) && !attribute[k]) newObject[k] = attribute[k];
    // 判断当前属性是否已hide开头的属性，并且判断当前属性的值时候为ture才向其添加此字段
    if (hidexx.test(k) && attribute[k]) newObject[k] = attribute[k];
  });
}

const genderIndexRoute = (indexId, pagesData) => {
  const { layouts, pages, groups } = pagesData;
  const index_info = pages.find(k => k.id === indexId);
  let redirect = '';
  if (index_info) {
    if (index_info.layout_id) {
      const layout_info = layouts.find(k => k.id === index_info.layout_id);
      redirect += `/${layout_info.name}`;
    }
    if (index_info.group_id) {
      // 嵌套分组路由生成
      function reverseFindPath(child_id) {
        const group_info = groups.find(k => k.id === child_id);
        let path = group_info.name;
        if (group_info.parent_id) {
          path = reverseFindPath(group_info.parent_id) + '/' + path;
        }
        return path;
      }

      redirect += `/${reverseFindPath(index_info.group_id)}`;
    }
    redirect += `/${index_info.name}`;
  }
  return {
    path: '/',
    redirect,
  };
};

const genderGroupRoute = (group, pages, frontingPath = '') => {
  const path = `${frontingPath}/${group.name}`;
  const route = {
    name: group.title,
    path,
    icon: group.icon,
    routes: [], // GroupRoute || PageRoute
  };
  pages.forEach(k => {
    // 在当前分组下面
    if (k.group_id === group.id) {
      route.routes.push(genderPageRoute(k, path));
    }
  });
  return route;
};

const genderPageRoute = (page, frontingPath = '') => {
  const { attribute = {} } = page;
  let component_path;
  let path = (component_path = `${frontingPath}/${page.name}`);
  const {
    schema: { params },
  } = page;
  if (params && params.length) {
    path += '/:' + params.map(k => k.name).join('/:');
  }
  const route = {
    name: page.title,
    path,
    icon: attribute.icon,
    component: `@/pages${component_path}`,
    pageId: page.id,
  };
  // 添加属性判断
  addAttribute(route, page);
  return route;
};

const genderLayoutRoute = (layout, groups, pages) => {
  const path = `/${layout.name}`;
  let route = {
    name: layout.title,
    path,
    component: `@/layouts${path}`,
    routes: nestedGroup('', path), // GroupRoute || PageRoute
  };
  // 添加属性判断
  addAttribute(route, layout);

  // 嵌套分组路由生成
  function nestedGroup(parent_id, parent_path) {
    const routes = [];
    groups.forEach(k => {
      if (parent_id === k.parent_id && k.layout_id === layout.id) {
        let groups_item = genderGroupRoute(k, pages, parent_path);
        groups_item.routes = groups_item.routes.concat(
          nestedGroup(k.id, groups_item.path),
        );
        routes.push(groups_item);
      }
    });
    return routes;
  }

  // 页面在当前布局下面没有在分组下面
  pages.forEach(k => {
    if (k.layout_id === layout.id && !k.group_id)
      route.routes.push(genderPageRoute(k, path));
  });
  return route;
};

const genderRoutes = (indexId, layouts, groups, pages) => {
  let routes = [];
  // 添加首页重定向
  routes.push(genderIndexRoute(indexId, { layouts, groups, pages }));
  // 页面没有在布局和分组下面
  pages.forEach(k => {
    if (!k.layout_id && !k.group_id) routes.push(genderPageRoute(k));
  });
  // 添加布局路由
  layouts.forEach(k => {
    routes.push(genderLayoutRoute(k, groups, pages));
  });
  return routes;
};

module.exports = genderRoutes