import React from 'react';

const Tab = () => {
    return (
        <div>
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-box">
                <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 1" />
                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

                <input type="radio" name="my_tabs_6" className="tab" aria-label="Tab 2" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

            </div>
        </div>
    );
};

export default Tab;