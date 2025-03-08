import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const RoofingForm = () => {
  // State for all form fields
  const [projectType, setProjectType] = useState();
  const [roofType, setRoofType] = useState();
  const [kindOfRoof, setKindOfRoof] = useState();
  const [shingleType, setShingleType] = useState();
  const [woodType, setWoodType] = useState();
  const [otherShingleExplanation, setOtherShingleExplanation] = useState('');
  const [replacementType, setReplacementType] = useState();
  const [otherReplacementExplanation, setOtherReplacementExplanation] = useState('');
  const [isLeaking, setIsLeaking] = useState();
  const [insuranceClaim, setInsuranceClaim] = useState();
  const [squareFootage, setSquareFootage] = useState();
  const [stories, setStories] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { 
      projectType, 
      roofType, 
      kindOfRoof, 
      shingleType,
      woodType,
      otherShingleExplanation,
      replacementType,
      otherReplacementExplanation,
      isLeaking,
      insuranceClaim,
      squareFootage,
      stories
    });
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setProjectType(undefined);
    setRoofType(undefined);
    setKindOfRoof(undefined);
    setShingleType(undefined);
    setWoodType(undefined);
    setOtherShingleExplanation('');
    setReplacementType(undefined);
    setOtherReplacementExplanation('');
    setIsLeaking(undefined);
    setInsuranceClaim(undefined);
    setSquareFootage(undefined);
    setStories(undefined);
    setIsSubmitted(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Create a result message with all selections
  const createResultMessage = () => {
    let message = `Project type: ${projectType}`;
    
    if (projectType === 'install-replace') {
      message += `\nRoof type: ${roofType}`;
      
      if (roofType === 'sloped') {
        message += `\nDesired roof: ${kindOfRoof}`;
        
        if (kindOfRoof === 'shingle') {
          message += `\nShingle type: ${shingleType}`;
          
          if (shingleType === 'wood') {
            message += `\nWood type: ${woodType}`;
          } else if (shingleType === 'other') {
            message += `\nExplanation: ${otherShingleExplanation}`;
          }
        }
        
        message += `\nReplacement type: ${replacementType}`;
        
        if (replacementType === 'other') {
          message += `\nExplanation: ${otherReplacementExplanation}`;
        }
        
        if (replacementType !== 'new-installation') {
          message += `\nLeaking/damaged: ${isLeaking}`;
        }
      }
    }
    
    message += `\nInsurance claim: ${insuranceClaim}`;
    message += `\nSquare footage: ${squareFootage}`;
    message += `\nStories: ${stories}`;
    
    return message;
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium">Thank You!</CardTitle>
          <CardDescription>Your roofing project information has been submitted</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <p className="text-lg mb-6 whitespace-pre-line">
              {createResultMessage()}
            </p>
            <Button onClick={resetForm} className="mt-4">Submit Another Request</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">Roofing Project Information</CardTitle>
        <CardDescription>Please provide details about your roofing needs</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Project Type */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium mb-2 block">
                What kind of roofing project do you need help with?
              </label>
              <Select
                value={projectType}
                onValueChange={(value) => {
                  setProjectType(value);
                  // Reset subsequent fields
                  setRoofType(undefined);
                  setKindOfRoof(undefined);
                  setShingleType(undefined);
                  setWoodType(undefined);
                  setOtherShingleExplanation('');
                  setReplacementType(undefined);
                  setOtherReplacementExplanation('');
                  setIsLeaking(undefined);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="install-replace">Install or replace a roof</SelectItem>
                  <SelectItem value="repair">Repair a roof</SelectItem>
                  <SelectItem value="clean">Clean a roof</SelectItem>
                  <SelectItem value="skylights">Install, repair or maintain skylights</SelectItem>
                  <SelectItem value="inspect">Inspect a roof</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Roof Type - Only if "Install or replace a roof" is selected */}
            {projectType === 'install-replace' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  Is your roof sloped or flat?
                </label>
                <Select
                  value={roofType}
                  onValueChange={(value) => {
                    setRoofType(value);
                    // Reset subsequent fields
                    setKindOfRoof(undefined);
                    setShingleType(undefined);
                    setWoodType(undefined);
                    setOtherShingleExplanation('');
                    setReplacementType(undefined);
                    setOtherReplacementExplanation('');
                    setIsLeaking(undefined);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sloped">Sloped or pitched</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Roof Kind - Only if "Sloped or pitched" is selected */}
            {projectType === 'install-replace' && roofType === 'sloped' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What kind of roof do you want?
                </label>
                <Select
                  value={kindOfRoof}
                  onValueChange={(value) => {
                    setKindOfRoof(value);
                    // Reset subsequent fields
                    setShingleType(undefined);
                    setWoodType(undefined);
                    setOtherShingleExplanation('');
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select roof kind" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shingle">Shingle or shake</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="rubber">Rubber</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="slate">Slate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Shingle Type - Only if "Shingle or shake" is selected */}
            {projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What kind of shingle roof do you want to install?
                </label>
                <Select
                  value={shingleType}
                  onValueChange={(value) => {
                    setShingleType(value);
                    // Reset subsequent fields
                    setWoodType(undefined);
                    setOtherShingleExplanation('');
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select shingle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asphalt">Asphalt</SelectItem>
                    <SelectItem value="composite">Composite</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="rubber">Rubber</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Wood Type - Only if "Wood" is selected */}
            {projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && shingleType === 'wood' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What type of wood?
                </label>
                <Select value={woodType} onValueChange={setWoodType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select wood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shingle">Shingle</SelectItem>
                    <SelectItem value="shake">Shake</SelectItem>
                    <SelectItem value="not-sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Other Shingle Explanation - Only if "Other" is selected for shingle type */}
            {projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && shingleType === 'other' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  Please explain:
                </label>
                <Input
                  value={otherShingleExplanation}
                  onChange={(e) => setOtherShingleExplanation(e.target.value)}
                  placeholder="Please explain the type of shingle you want"
                />
              </motion.div>
            )}

            {/* Replacement Type - Only if a roof type is selected */}
            {projectType === 'install-replace' && roofType && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What kind of roof is being replaced?
                </label>
                <Select
                  value={replacementType}
                  onValueChange={(value) => {
                    setReplacementType(value);
                    // Reset subsequent fields
                    setOtherReplacementExplanation('');
                    if (value === 'new-installation') {
                      setIsLeaking(undefined);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select replacement type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shingle">Shingle or shake</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="rubber">Rubber</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="slate">Slate</SelectItem>
                    <SelectItem value="not-sure">I'm not sure</SelectItem>
                    <SelectItem value="new-installation">No replacement, this is a new installation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Other Replacement Explanation - Only if "Other" is selected for replacement type */}
            {projectType === 'install-replace' && roofType && replacementType === 'other' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  Please explain:
                </label>
                <Input
                  value={otherReplacementExplanation}
                  onChange={(e) => setOtherReplacementExplanation(e.target.value)}
                  placeholder="Please explain the type of roof being replaced"
                />
              </motion.div>
            )}

            {/* Leaking - Only if a replacement type is selected and not "No replacement" */}
            {projectType === 'install-replace' && roofType && replacementType && replacementType !== 'new-installation' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  Is the existing roof leaking or damaged?
                </label>
                <Select value={isLeaking} onValueChange={setIsLeaking}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select yes or no" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="not-sure">I'm not sure</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Insurance Claim - Always shown */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium mb-2 block">
                Are you filing an insurance claim for this project?
              </label>
              <Select value={insuranceClaim} onValueChange={setInsuranceClaim}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="not-sure">I'm not sure</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Square Footage - Always shown */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium mb-2 block">
                What's the approximate square footage of your home?
              </label>
              <Select value={squareFootage} onValueChange={setSquareFootage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select square footage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1000">Under 1000 sq ft</SelectItem>
                  <SelectItem value="1000-2000">1000-2000 sq ft</SelectItem>
                  <SelectItem value="2000-3000">2000-3000 sq ft</SelectItem>
                  <SelectItem value="over-3000">Over 3000 sq ft</SelectItem>
                  <SelectItem value="not-sure">I'm not sure</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Stories - Always shown */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium mb-2 block">
                How many stories tall is your home?
              </label>
              <Select value={stories} onValueChange={setStories}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select number of stories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one">One floor</SelectItem>
                  <SelectItem value="two">Two floors</SelectItem>
                  <SelectItem value="three-plus">Three or more floors</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={
                  !projectType || 
                  (projectType === 'install-replace' && !roofType) ||
                  (projectType === 'install-replace' && roofType === 'sloped' && !kindOfRoof) ||
                  (projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && !shingleType) ||
                  (projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && shingleType === 'wood' && !woodType) ||
                  (projectType === 'install-replace' && roofType === 'sloped' && kindOfRoof === 'shingle' && shingleType === 'other' && !otherShingleExplanation) ||
                  (projectType === 'install-replace' && roofType && !replacementType) ||
                  (projectType === 'install-replace' && roofType && replacementType === 'other' && !otherReplacementExplanation) ||
                  (projectType === 'install-replace' && roofType && replacementType && replacementType !== 'new-installation' && !isLeaking) ||
                  !insuranceClaim ||
                  !squareFootage ||
                  !stories
                }
              >
                Submit
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoofingForm;
