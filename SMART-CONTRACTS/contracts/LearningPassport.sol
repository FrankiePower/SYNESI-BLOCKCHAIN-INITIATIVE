// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningPassport is ERC721, Ownable {
    uint256 private _adminIdCounter;
    uint256 private _learnerIdCounter;
    uint256 private _courseIdCounter;
    uint256 private _tokenIdCounter;

    struct Admin {
        uint256 id;
        string name;
        bool isActive;
    }

    struct Learner {
        uint256 id;
        string name;
        bool isActive;
    }

    struct Course {
        uint256 id;
        string name;
        uint8 modules;
        bool isActive;
        address admin;
    }

    struct Progress {
        uint256 completedModules;
        bool isCompleted;
    }

    mapping(address => Admin) public admins;
    mapping(address => Learner) public learners;
    mapping(uint256 => Course) public courses;

    // learner address => course ID => course progress
    mapping(address => mapping(uint256 => Progress)) public learnerProgress;
    mapping(uint256 tokenId => uint256 courseId) public tokenToCourse;

    // address => course/learner ID => course activity (bool check)
    mapping(address => mapping(uint256 => bool)) public adminCourses;
    mapping(address => mapping(uint256 => bool)) public learnerCourses;

    mapping(address => uint256[]) public adminMintedNFTs;
    mapping(address => uint256[]) public learnerMintedNFTs;

    event AdminRegistered(address indexed adminAddress, uint256 adminId);
    event LearnerRegistered(address indexed learnerAddress, uint256 learnerId);
    event CourseCreated(address indexed admin, uint256 courseId, uint8 modules);
    event CourseUpdated(uint256 indexed courseId, uint8 modules);
    event CourseDeleted(uint256 courseId);
    event CourseRemoved(address indexed learner, uint256 indexed courseId);
    event LearnerEnrolled(address indexed learner, uint256 indexed courseId);
    event ProgressUpdated(
        address indexed learner,
        uint256 indexed courseId,
        uint256 completedModules,
        bool isCompleted
    );
    event NFTMinted(address indexed user, uint256 tokenId, uint256 courseId);

    constructor() ERC721("LearningPassport", "LPX") Ownable(msg.sender) {}

    modifier onlyAdmin() {
        require(msg.sender != address(0), "Address Zero not allowed!");
        require(admins[msg.sender].isActive, "Not an active Admin");
        _;
    }

    modifier onlyLearner() {
        require(msg.sender != address(0), "Address Zero not allowed!");
        require(learners[msg.sender].isActive, "Not an active Learner");
        _;
    }

    // Register dApp Admin
    function registerAdmin(string memory _name) external {
        require(msg.sender != address(0), "Address Zero not allowed!");
        require(!admins[msg.sender].isActive, "Admin already registered");

        _adminIdCounter++;
        admins[msg.sender] = Admin(_adminIdCounter, _name, true);

        emit AdminRegistered(msg.sender, _adminIdCounter);
    }

    // Register dApp Learner
    function registerLearner(string memory _name) external {
        require(msg.sender != address(0), "Address Zero not allowed!");
        require(!learners[msg.sender].isActive, "Learner already registered");

        _learnerIdCounter++;
        learners[msg.sender] = Learner(_learnerIdCounter, _name, true);

        emit LearnerRegistered(msg.sender, _learnerIdCounter);
    }

    // Track and mint NFT for the admin when creating a course
    function createCourse(
        string memory _name,
        uint8 _modules
    ) external onlyAdmin {
        _courseIdCounter++;
        courses[_courseIdCounter] = Course(
            _courseIdCounter,
            _name,
            _modules,
            true,
            msg.sender
        );

        adminCourses[msg.sender][_courseIdCounter] = true;

        // Mint an NFT for the admin for creating this course
        _tokenIdCounter++;
        _safeMint(msg.sender, _tokenIdCounter);

        // Track the NFT minted for the admin
        adminMintedNFTs[msg.sender].push(_tokenIdCounter);

        // Associate this token with the course
        tokenToCourse[_tokenIdCounter] = _courseIdCounter;

        emit CourseCreated(msg.sender, _courseIdCounter, _modules);
        emit NFTMinted(msg.sender, _tokenIdCounter, _courseIdCounter);
    }

    // Learner updates progress and gets an NFT on completion
    function updateCourse(
        uint256 _courseId,
        string memory _name,
        uint8 _modules
    ) external onlyAdmin {
        require(courses[_courseId].isActive, "Course does not exist");
        require(courses[_courseId].admin == msg.sender, "Not the course admin");

        courses[_courseId].name = _name;
        courses[_courseId].modules = _modules;

        emit CourseUpdated(_courseId, _modules);
    }

    function deleteCourse(uint256 _courseId) external onlyAdmin {
        require(courses[_courseId].isActive, "Course does not exist");
        require(courses[_courseId].admin == msg.sender, "Not the course admin");

        courses[_courseId].isActive = false;
        adminCourses[msg.sender][_courseId] = false;

        // Burn or invalidate the admin's NFT associated with this course (Fix valid tokenId)
        // _burn(_tokenIdCounter);

        emit CourseDeleted(_courseId);
    }

    function enrollLearner(
        address _address,
        uint256 _courseId
    ) external onlyLearner {
        require(learners[_address].isActive, "Learner is not active");
        require(courses[_courseId].isActive, "Course is not active");
        require(
            !learnerCourses[_address][_courseId],
            "Learner is already enrolled in this course"
        );

        // Enroll the learner in the course
        learnerCourses[_address][_courseId] = true;

        // Initialize the learner's progress for this course
        learnerProgress[_address][_courseId] = Progress({
            completedModules: 0,
            isCompleted: false
        });

        emit LearnerEnrolled(_address, _courseId);
    }

    // Learner updates progress and gets an NFT on completion
    function updateProgress(uint256 _courseId) external onlyLearner {
        require(courses[_courseId].isActive, "Course does not exist");
        require(
            !learnerProgress[msg.sender][_courseId].isCompleted,
            "Course already completed"
        );
        require(
            learnerCourses[msg.sender][_courseId],
            "Learner has removed course!"
        );

        Progress storage progress = learnerProgress[msg.sender][_courseId];
        progress.completedModules++;

        if (!learnerCourses[msg.sender][_courseId]) {
            learnerCourses[msg.sender][_courseId] = true;
        }

        // Mint NFT when learner completes all course modules
        if (progress.completedModules == courses[_courseId].modules) {
            progress.isCompleted = true;
            _tokenIdCounter++;

            uint256 newTokenId = _tokenIdCounter;
            _safeMint(msg.sender, newTokenId);

            tokenToCourse[newTokenId] = _courseId;
            learnerMintedNFTs[msg.sender].push(newTokenId);

            emit NFTMinted(msg.sender, _tokenIdCounter, _courseId);
        }

        emit ProgressUpdated(
            msg.sender,
            _courseId,
            progress.completedModules,
            progress.isCompleted
        );
    }

    function removeCourse(uint256 _courseId) external onlyLearner {
        require(learners[msg.sender].isActive, "Learner is not active");
        require(courses[_courseId].isActive, "Course is not active");
        require(learnerCourses[msg.sender][_courseId], "Learner not enrolled");

        // Remove the course from learner's enrolled courses
        learnerCourses[msg.sender][_courseId] = false;

        // Reset the learner's progress for this course
        delete learnerProgress[msg.sender][_courseId];

        emit CourseRemoved(msg.sender, _courseId);
    }

    function getLearnerProgress(
        address _learner,
        uint256 _courseId
    ) external view returns (uint256, bool) {
        Progress memory progress = learnerProgress[_learner][_courseId];
        return (progress.completedModules, progress.isCompleted);
    }

    function getCourseDetails(
        uint256 _courseId
    ) external view returns (string memory, uint8, bool, address) {
        Course memory course = courses[_courseId];
        return (course.name, course.modules, course.isActive, course.admin);
    }

    function isAdminCourse(
        address _admin,
        uint256 _courseId
    ) external view returns (bool) {
        return adminCourses[_admin][_courseId];
    }

    function isLearnerCourse(
        address _learner,
        uint256 _courseId
    ) external view returns (bool) {
        return learnerCourses[_learner][_courseId];
    }

    // function getAdminCourses() external {}

    // function getLearnerCourses() external {}
}
