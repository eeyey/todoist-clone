import React from 'react';

import { List } from '../../common';
import { LinkItem } from '../LinkItem';
import { InboxIcon24, IncomingIcon24, TodayIcon24 } from '../../icons';

import { selectTodos, useAppSelector } from '../../../core/store';

import { isToday } from '../../../core/utils/date';

export const SidebarMenu = () => {
  const { todos } = useAppSelector(selectTodos);

  const menuItems = React.useMemo(() => {
    return [
      {
        to: '/project/0',
        text: 'Входящие',
        score: todos.filter((todo) => todo.projectId === 0).length,
        isOverdue: false,
        icon: <InboxIcon24 />,
      },
      {
        to: '/today/',
        text: 'Сегодня',
        score: todos.filter((todo) => isToday(todo.term)).length,
        isOverdue: true,
        icon: <TodayIcon24 />,
      },
      {
        to: '/upcoming/',
        text: 'Предстоящее',
        icon: <IncomingIcon24 />,
      },
    ];
  }, [todos]);

  return (
    <List
      renderItem={(item) => <LinkItem key={item.to} {...item} />}
      items={menuItems}
      style={{ paddingLeft: '16px' }}
    />
  );
};
