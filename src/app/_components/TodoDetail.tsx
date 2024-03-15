import { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  DatePicker,
  DatePickerValue,
  Dialog,
  DialogPanel,
} from '@tremor/react';

import ja from 'date-fns/locale/ja';

import { Todo } from '@/types';
import { fetchTodos, updateTodo } from '@/firebase';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

const toDay = new Date();

type TodoDetailProp = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  target: Todo | undefined;
  user: User | null;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};
export const TodoDetail = (props: TodoDetailProp) => {
  const { isOpen, setIsOpen, target, user, setTodoList } = props;
  const [deadLine, setDeadLine] = useState<Timestamp | null | undefined>(
    target?.deadLine
  );
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      static={true}
      className="z-[100]"
    >
      <DialogPanel className="max-w-sm items-center">
        <DatePicker
          style={{ width: 30 }}
          locale={ja}
          minDate={toDay}
          placeholder="期限日設定"
          onValueChange={(value) => {
            updateTodo(target!.id, { deadLine: value ?? null });
            setDeadLine(value ? Timestamp.fromDate(value) : null);
            fetchTodos(user, setTodoList);
          }}
        />
        <Button
          variant="light"
          className="mx-auto flex items-center"
          onClick={() => setIsOpen(false)}
          style={{
            minHeight: '40vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            登録日:{' '}
            {String(target?.created_at.toDate().getFullYear()) +
              '/' +
              String(Number(target?.created_at.toDate().getMonth()) + 1) +
              '/' +
              String(target?.created_at.toDate().getDate())}
          </div>
          <div>
            期限日:
            {target?.deadLine
              ? target?.deadLine?.toDate().toLocaleDateString()
              : '設定されていません'}
          </div>
        </Button>
      </DialogPanel>
    </Dialog>
  );
};
