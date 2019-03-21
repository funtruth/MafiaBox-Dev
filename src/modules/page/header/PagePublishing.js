import React from 'react'

export default function PageHeader(props) {
    const { path, pageInfo } = props
    const { published, publishedAt } = pageInfo

    const handlePublish = () => {
        props.updatePage(path, {
            published: true,
            publishedAt: Date.now(),
        })
    }
    console.log({props})
    if (published) {
        return (
            <div className="row page-header-button" onClick={handlePublish}>
                <i className="page-header-icon mdi mdi-bookmark-check"></i>
                Published
            </div>
        )
    }

    return (
        <div className="row page-header-button" onClick={handlePublish}>
            <i className="page-header-icon mdi mdi-publish"></i>
            Publish
        </div>
    )
}