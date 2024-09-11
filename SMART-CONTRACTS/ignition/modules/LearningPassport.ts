import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LearningPassportModule = buildModule("LearningPassportModule", (m) => {
    const learningpassport = m.contract("LearningPassport");

    return { learningpassport };
});

export default LearningPassportModule;



// Deployed Contract: 0x2B2D06C26E0bb753Fc8C36f29Bbdf91246E45901