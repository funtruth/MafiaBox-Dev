export const phaseActionMode = {
    all: 'phaseActionMode/all',
    king: 'phaseActionMode/king',
    clown: 'phaseActionMode/clown',
    none: 'phaseActionMode/none',
}

export const phaseTriggerType = {
    none: 'phaseTriggerType/none',
    allReady: 'phaseTriggerType/allReady',
    majority: 'phaseTriggerType/majority',
}

export const phaseTriggerTitle = {
    [phaseTriggerType.allReady]: 'All Ready',
    [phaseTriggerType.majority]: 'Majority',
    [phaseTriggerType.none]: 'None',
}

export const phaseTriggerCode = {
    [phaseTriggerType.allReady]: 'hello',
    [phaseTriggerType.majority]: 'testing',
}