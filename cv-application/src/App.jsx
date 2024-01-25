import { useState } from 'react';
import './App.css'

function RecordItemConfigForm({ initialValue, onSubmit }) {
    const { heading, timestamp, description } = initialValue
    return (
        <>
            <form action="" className="record__configForm" onSubmit={onSubmit}>
                <input type="text" className="configForm__heading" name="heading" placeholder={heading} />
                <input type="text" className="configForm__timestamp" name="timestamp" placeholder={timestamp} />
                <input type="text" className="configForm__description" name="description" placeholder={description} />
                <button
                    type="submit"
                > Submit </button>
            </form>
        </>
    )
}

function RecordItem({ value, idx, editingIdx, setEditingIdx, setRecord }) {
    const { heading, timestamp, description } = value
    const isEditing = editingIdx == idx;
    return (
        <section className="record__item" key={idx}>
            <div className="record__header">
                <h3 className="record__heading"> {isEditing ? `[CONFIGURE] ${heading}` : heading} </h3>
                {!isEditing ?
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3686/3686836.png"
                        className="icon icon--small"
                        alt=""
                        onClick={() => {
                            setEditingIdx(idx);
                        }}
                    /> :
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8303/8303684.png"
                        alt="Cancel add record"
                        className="icon icon--small"
                        onClick={() => setEditingIdx(-1)}
                    />
                }
            </div>
            {!isEditing ? (
                <>
                    <p className="record__timestamp"> {timestamp} </p>
                    <p className="record__description"> {description} </p>
                </>
            ) :
                <RecordItemConfigForm
                    initialValue={value}
                    onSubmit={(e) => {
                        e.preventDefault()
                        const newData = new FormData(e.target);
                        setRecord(idx, {
                            heading: newData.get("heading") == "" ? heading : newData.get("heading"),
                            timestamp: newData.get("timestamp") == "" ? timestamp : newData.get("timestamp"),
                            description: newData.get("description") == "" ? description : newData.get("description"),
                        });
                        setEditingIdx(-1);
                    }}
                />
            }
        </section>
    )
}

function RecordAddForm({ onSubmit, id }) {
    return (
        <form className="record__Addform" id={`form__${id}`} onSubmit={onSubmit}>
            <input type="text" className="addForm__heading" />
            <input type="text" className="addForm__timestamp" />
            <button
                type='submit'
                id={`form__${id}`}
            > Submit </button>
        </form>
    )
}

function UserRecords({ records, recordHeading }) {
    const [recordList, setRecordList] = useState(records);
    const [editingIdx, setEditingIdx] = useState(-1);
    const [isAdding, setIsAdding] = useState(false);

    return (
        <>
            <div className="detail__recordHeader">
                <h2 className="detail__heading" id="user__Achievements"> {recordHeading} </h2>
                {!isAdding && (editingIdx == -1) ?
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/11127/11127933.png"
                        alt="Add record"
                        className="icon icon--medium"
                        onClick={() => setIsAdding(true)}
                    /> :
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8303/8303684.png"
                        alt="Cancel add record"
                        className="icon icon--medium"
                        onClick={() => setIsAdding(false)}
                    />
                }
            </div>

            {isAdding ? <RecordAddForm
                id={recordHeading}
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsAdding(false);
                }} /> : <></>
            }

            <section className="detail__records">
                {
                    recordList.map((value, idx) => {
                        return <RecordItem
                            value={value}
                            key={idx}
                            idx={idx}
                            editingIdx={editingIdx}
                            setEditingIdx={setEditingIdx}
                            setRecord={(idxToChange, newVal) => {
                                let newRecord = recordList.map((val, idx) => {
                                    if (idx == idxToChange) {
                                        return newVal;
                                    }
                                    return val;
                                })
                                setRecordList(newRecord);
                            }}
                        />
                    })
                }
            </section>
        </>
    )
}

function App() {
    return (
        <div className="app">
            <section className="user__profile">
                <div className="profile__wrapper">
                    <div className="profile__image">
                        <img src="https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxwcm9maWxlJTIwZmVtYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                            alt="" />
                    </div>
                    <section className="profile__details">
                        <h1 className="profile__name"> Chelsea Larssen</h1>
                        <section className="profile__links">
                            <div className="linkItem">
                                <img src="" alt="" className="link__logo" />
                                <a href="" className="link__text"></a>
                            </div>
                            <div className="linkItem">
                                <img src="" alt="" className="link__logo" />
                                <a href="" className="link__text"></a>
                            </div>
                        </section>
                    </section>
                </div>
            </section>
            <section className="user__details">
                <section className="user__navigation">
                    {
                        ["Achievements", "Experiences", "Portofolio"].map((val, idx) => {
                            return (
                                <a className="nav__item" key={idx} href={`/#user__${val}`}>
                                    <p>{val}</p>
                                </a>
                            )
                        })
                    }
                </section>
                <section className="user__detailItem">
                    <UserRecords
                        recordHeading="Achievements"
                        records={
                            [
                                {
                                    heading: "National Apex Hackathon",
                                    timestamp: "July 2033",
                                    description: "Finished as the finalist. This Hackathon aims to support local visual content creators cross the nation",
                                },
                            ]
                        } />
                </section>
                <section className="user__detailItem">
                    <UserRecords
                        recordHeading="Experiences"
                        records={
                            [
                                {
                                    heading: "Imagi: Otherwordly Vision",
                                    timestamp: "2032",
                                    description: "Participated as the public relation commitee. Imagi is a bi-annual event for photographers and editors for sharing their photographs and any image form creations. The 2032 Imagi was held with a theme 'Otherwordly'. The event was visited by over 100000 visitors.",
                                },
                                {
                                    heading: "Educodetion's UI/UX Crash Course",
                                    timestamp: "2031",
                                    description: "A course focused on designing a personal taste-based interface for a program while serving an excellent experience for its user",
                                },
                                {
                                    heading: "Mesmerize",
                                    timestamp: "2027",
                                    description: "A mid-to-professional bootcamp for photographers to further enhance the quality of their works. The bootcamp was held for 7 weeks and ended by producing 14 signature shoots to be presented at a public exhibition.",
                                },
                                {
                                    heading: "Mesmerize",
                                    timestamp: "2027",
                                    description: "A mid-to-professional bootcamp for photographers to further enhance the quality of their works. The bootcamp was held for 7 weeks and ended by producing 14 signature shoots to be presented at a public exhibition.",
                                },
                                {
                                    heading: "Mesmerize",
                                    timestamp: "2027",
                                    description: "A mid-to-professional bootcamp for photographers to further enhance the quality of their works. The bootcamp was held for 7 weeks and ended by producing 14 signature shoots to be presented at a public exhibition.",
                                },
                                {
                                    heading: "Mesmerize",
                                    timestamp: "2027",
                                    description: "A mid-to-professional bootcamp for photographers to further enhance the quality of their works. The bootcamp was held for 7 weeks and ended by producing 14 signature shoots to be presented at a public exhibition.",
                                },
                            ]
                        } />
                </section>
            </section>
        </div>
    )
}

export default App
