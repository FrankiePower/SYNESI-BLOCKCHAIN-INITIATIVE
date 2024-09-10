pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LearningPassport is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct Course {
        string name;
        string courseId;
        uint256 requiredModules;
    }
    
    struct Learner {
        string name;
        string learnerId;
        mapping(string => uint256) courseProgress;
    }
    
    mapping(address => Learner) public learners;
    mapping(string => Course) public courses;
    
    constructor() ERC721("LearningPassport", "LP") {}
    
    function registerLearner(string memory _name) public {
        require(bytes(learners[msg.sender].name).length == 0, "Learner already registered");
        string memory learnerId = string(abi.encodePacked("LEARNER.", _name));
        learners[msg.sender] = Learner(_name, learnerId);
    }
    
    function createCourse(string memory _name, uint256 _requiredModules) public {
        string memory courseId = string(abi.encodePacked("COURSE.", _name));
        require(courses[courseId].requiredModules == 0, "Course already exists");
        courses[courseId] = Course(_name, courseId, _requiredModules);
    }
    
    function updateProgress(string memory _courseId) public {
        require(bytes(learners[msg.sender].name).length > 0, "Learner not registered");
        require(courses[_courseId].requiredModules > 0, "Course does not exist");
        require(learners[msg.sender].courseProgress[_courseId] < courses[_courseId].requiredModules, "Course already completed");
        
        learners[msg.sender].courseProgress[_courseId]++;
        
        if (learners[msg.sender].courseProgress[_courseId] == courses[_courseId].requiredModules) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
        }
    }
    
    function getLearnerProgress(string memory _courseId) public view returns (uint256) {
        return learners[msg.sender].courseProgress[_courseId];
    }
    
    function getCourseDetails(string memory _courseId) public view returns (string memory, uint256) {
        Course memory course = courses[_courseId];
        return (course.name, course.requiredModules);
    }
}