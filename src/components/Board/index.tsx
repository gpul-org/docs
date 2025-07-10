import React, {ReactNode} from 'react';
import styles from './index.module.css';

const boardMembers = [
  {
    name: 'Jorge Teixeira',
    role: 'Presidente',
    gh: 'https://github.com/jorgeteixe',
  },
  {
    name: 'David Maseda',
    role: 'Vicepresidente',
    gh: 'https://github.com/wizenink',
  },
  {
    name: 'Álvaro Freire',
    role: 'Tesoureiro',
    gh: 'https://github.com/alvaro-freire',
  },
  {
    name: 'Paula Taibo',
    role: 'Secretaria',
    gh: 'https://github.com/PT-15',
  },
  {
    name: 'Siyuan He',
    role: 'Vogal',
    gh: 'https://github.com/siyunesweek',
  },
  {
    name: 'Bruno Cabado',
    role: 'Vogal',
    gh: 'https://github.com/Kr4is',
  },
  {
    name: 'Pedro Costal',
    role: 'Vogal',
    gh: 'https://github.com/pedrety',
  },
];

export default function Board(): ReactNode {
  return (
    <section className={styles.board}>
      <h2 className={styles.title}>Xunta Directiva</h2>
      <div className="container">
        <div className="row">
          {boardMembers.map((member, idx) => (
            <div key={idx} className="col col--3 margin-bottom--md">
              <div className="card">
                <div className="card__header">
                  <div className="avatar">
                    <a
                      href={member.gh}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img
                        className="avatar__photo"
                        src={`${member.gh}.png`}
                        alt={`${member.name}`}
                      />
                    </a>
                    <div className="avatar__intro">
                      <div className="avatar__name">{member.name}</div>
                      <small className="avatar__subtitle">{member.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
