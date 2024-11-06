import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Space, Tag, message } from 'antd';
import { fetchRecords, createRecord, updateRecord, deleteRecord } from '../../api/question';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';
import { Question } from '../../interface/question';
const { Column, ColumnGroup } = MyTable;

// interface Question {
//   id: string;
//   questionText: string;
//   questionType: string;
//   choiceA: string;
//   choiceB: string;
//   choiceC: string;
//   choiceD: string;
//   correct_ans: string;
// }

const data2: Question[] = [
  {
    Id: '1',
    question_text: 'Answer the question: 1 + 1 = ?',
    question_type: 'Multiple Choice',
    choice_A: 'Answer is 2',
    choice_B: 'Answer is 3',
    choice_C: 'Answer is 4',
    choice_D: 'Answer is 5',
    correct_ans: 'Answer is A',
  },
];

const TablePage: FC = () => {
  const [data, setData] = useState<Question[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const records = await fetchRecords();
      setData(records);
    } catch (error) {
      setData(data2);
      // message.error('Failed to load records');
    }
  };

  const onSubmit = async () => {
    const values = 3;
  };

  return (
    <div className="aaa">
      <MyTable<Question> dataSource={data} rowKey={record => record.Id}>
        <Column title="Question Id" dataIndex="Id" key="id" width="8%" />
        <Column title="Question Text" dataIndex="question_text" key="questionText" />
        <Column title="Question Type" dataIndex="question_type" key="questionType" width="8%"/>
        <ColumnGroup title="Name">
          <Column title="Choice A" dataIndex="choice_A" key="choiceA" />
          <Column title="Choice B" dataIndex="choice_B" key="choiceB" />
          <Column title="Choice C" dataIndex="choice_C" key="choiceC" />
          <Column title="Choice D" dataIndex="choice_D" key="choiceD" />
        </ColumnGroup>
        <Column title="Correct Answer" dataIndex="correct_ans" key="correct_ans" width="8%" />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <MyButton type="text" onClick={onSubmit}>Modify {record.lastName}</MyButton>
              <MyButton type="text">Delete</MyButton>
            </Space>
          )}
        />
      </MyTable>
    </div>
  );
};

export default TablePage;

// import type { FC } from 'react';

// import { Typography } from 'antd';

// import { LocaleFormatter } from '@/locales';

// const { Title, Paragraph } = Typography;

// const div = <div style={{ height: 200 }}>2333</div>;

// const DocumentationPage: FC = () => {
//   return (
//     <div>
//       <Typography className="innerText">
//         <Title>
//           <LocaleFormatter id="app.documentation.introduction.title" />
//         </Title>
//         <Paragraph>
//           <LocaleFormatter id="app.documentation.introduction.description" />
//         </Paragraph>
//         <Title>
//           <LocaleFormatter id="app.documentation.catalogue.title" />
//         </Title>
//         <Paragraph>
//           <LocaleFormatter id="app.documentation.catalogue.description" />
//         </Paragraph>
//         <Paragraph>
//           <ul>
//             <li>
//               <a href="#layout">
//                 <LocaleFormatter id="app.documentation.catalogue.list.layout" />
//               </a>
//             </li>
//             <li>
//               <a href="#routes">
//                 <LocaleFormatter id="app.documentation.catalogue.list.routes" />
//               </a>
//             </li>
//             <li>
//               <a href="#request">
//                 <LocaleFormatter id="app.documentation.catalogue.list.request" />
//               </a>
//             </li>
//             <li>
//               <a href="#theme">
//                 <LocaleFormatter id="app.documentation.catalogue.list.theme" />
//               </a>
//             </li>
//             <li>
//               <a href="#typescript">
//                 <LocaleFormatter id="app.documentation.catalogue.list.typescript" />
//               </a>
//             </li>
//             <li>
//               <a href="#international">
//                 <LocaleFormatter id="app.documentation.catalogue.list.international" />
//               </a>
//             </li>
//           </ul>
//         </Paragraph>
//         <Title id="layout" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.layout" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//         <Title id="routes" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.routes" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//         <Title id="request" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.request" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//         <Title id="theme" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.theme" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//         <Title id="typescript" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.typescript" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//         <Title id="international" level={2}>
//           <LocaleFormatter id="app.documentation.catalogue.list.international" />
//         </Title>
//         <Paragraph>{div}</Paragraph>
//       </Typography>
//     </div>
//   );
// };

// export default DocumentationPage;
