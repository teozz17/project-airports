import React from 'react';

const ListsPage: React.FC = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
        <div>
            <h1>Lists of Things</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListsPage;